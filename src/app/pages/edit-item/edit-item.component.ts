// edit-item.component.ts (replace existing file with this)
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { MenuService } from '../../services/menu.service';
import { Product, ChoiceOption } from '../../models/product';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class EditItemComponent implements OnInit, OnDestroy {
  restaurantId: string = '';
  categories: { [key: string]: { name: string; nameArabic: string; icon: string } } = {};
  categoryList: any[] = [];
  items: any[] = [];
  selectedCategoryId: string = '';
  selectedItemId: string = '';
  selectedItem: any = null;
  isArabic: boolean = false;

  // Upload helpers
  previewUrl: string | null = null;
  uploading = false;
  uploadProgress = 0;
  pendingFile: File | null = null;
  selectedFileName: string | null = null;

  // Choice builder state
  choiceDraft: { en: string; ar: string; add: number } = { en: '', ar: '', add: 0 };
  choiceEditIndex: number | null = null;
  choiceOptions: ChoiceOption[] = [];

  // Replace this with your published worker URL
  private workerUrl = 'https://presigned-url-worker.a2-menu-worker.workers.dev/';

  // Subscriptions
  private subs: Subscription[] = [];
  private itemsSub: Subscription | null = null;

  constructor(
    private menuService: MenuService,
    private languageService: LanguageService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;
    this.loadCategories();
    this.subs.push(this.languageService.isArabic$.subscribe(value => this.isArabic = value));
  }

  ngOnDestroy(): void {
    // Unsubscribe from language and categories subscriptions
    this.subs.forEach(s => s.unsubscribe());
    this.subs = [];
    // Unsubscribe from items subscription
    if (this.itemsSub) {
      this.itemsSub.unsubscribe();
      this.itemsSub = null;
    }
  }

  // Choice builder actions
  addOrUpdateChoice() {
    const en = (this.choiceDraft.en || '').trim();
    const ar = (this.choiceDraft.ar || '').trim();
    const add = Number(this.choiceDraft.add) || 0;
    if (!en || !ar) return;
    const payload: ChoiceOption = { en, ar, add };
    if (this.choiceEditIndex != null) {
      this.choiceOptions[this.choiceEditIndex] = payload;
    } else {
      this.choiceOptions.push(payload);
    }
    this.resetChoiceDraft();
  }

  editChoiceAt(i: number) {
    // Toggle off if clicking the same selected chip
    if (this.choiceEditIndex === i) {
      this.resetChoiceDraft();
      return;
    }
    const c = this.choiceOptions[i];
    if (!c) return;
    this.choiceDraft = { en: c.en, ar: c.ar, add: c.add };
    this.choiceEditIndex = i;
  }

  removeChoiceAt(i: number, ev?: Event) {
    ev?.stopPropagation();
    if (this.choiceEditIndex === i) {
      this.resetChoiceDraft();
    }
    this.choiceOptions.splice(i, 1);
  }

  resetChoiceDraft() {
    this.choiceDraft = { en: '', ar: '', add: 0 };
    this.choiceEditIndex = null;
  }

  // Clear selected pending image
  clearPendingFile(): void {
    this.pendingFile = null;
    this.selectedFileName = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }

  loadCategories(): void {
    this.menuService.getCategoriesOnce(this.restaurantId)
      .then((categories) => {
        if (categories) {
          this.categories = categories;
          this.categoryList = Object.keys(categories).map(key => ({
            key: key,
            name: categories[key].name,
            nameArabic: categories[key].nameArabic,
            ...categories[key]
          }));
        } else {
          this.categories = {};
          this.categoryList = [];
        }
      })
      .catch(() => {
        this.categories = {};
        this.categoryList = [];
      });
  }

  onCategoryChange(): void {
    if (this.selectedCategoryId) {
      // cancel previous items subscription before subscribing again
      if (this.itemsSub) {
        this.itemsSub.unsubscribe();
        this.itemsSub = null;
      }
      this.itemsSub = this.menuService.getItems(this.restaurantId, this.selectedCategoryId).subscribe((items) => {
        if (items) {
          this.items = Object.keys(items).map(key => ({
            id: key,
            ...items[key]
          }));
        } else {
          this.items = [];
        }
        this.selectedItemId = '';
        this.selectedItem = null;
      });
    } else {
      if (this.itemsSub) {
        this.itemsSub.unsubscribe();
        this.itemsSub = null;
      }
      this.items = [];
      this.selectedItemId = '';
      this.selectedItem = null;
    }
  }

  onItemChange(): void {
    if (this.selectedItemId) {
      const item = this.items.find(i => i.id === this.selectedItemId);
      if (item) {
        // populate builder state from structured options or legacy arrays
        if (Array.isArray((item as any).choiceOptions) && (item as any).choiceOptions.length) {
          this.choiceOptions = ((item as any).choiceOptions as any[]).map(o => ({
            en: String(o.en || ''),
            ar: String(o.ar || ''),
            add: Number(o.add) || 0,
          }));
        } else {
          const ce: string[] = Array.isArray(item.choices) ? item.choices : [];
          const ca: string[] = Array.isArray(item.choicesArabic) ? item.choicesArabic : [];
          const n = Math.min(ce.length, ca.length);
          this.choiceOptions = Array.from({ length: n }, (_, i) => ({ en: ce[i] || '', ar: ca[i] || '', add: 0 }));
        }
        this.choiceDraft = { en: '', ar: '', add: 0 };
        this.choiceEditIndex = null;
        this.selectedItem = {
          ...item,
          ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : item.ingredients || '',
          ingredientsArabic: Array.isArray(item.ingredientsArabic) ? item.ingredientsArabic.join(', ') : item.ingredientsArabic || '',
          choices: Array.isArray(item.choices) ? item.choices.join(', ') : item.choices || '',
          choicesArabic: Array.isArray(item.choicesArabic) ? item.choicesArabic.join(', ') : item.choicesArabic || ''
        };
      }
    } else {
      this.selectedItem = null;
    }
  }

  // --- File selection (no upload yet) ---
  onFileSelected(event: any) {
    const file: File | null = event.target.files?.[0] || null;
    if (!file) return;
    if (!this.selectedCategoryId || !this.selectedItemId) {
      alert(this.isArabic ? 'اختر عنصر ثم اختر صورة' : 'Select an item first and choose an image.');
      return;
    }

    // show local preview immediately
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = URL.createObjectURL(file);
    this.pendingFile = file;
    this.selectedFileName = file.name;
  }

  // Upload to the Worker using multipart/form-data, track progress, and return the public URL
  private async uploadViaWorker(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('pathPrefix', `restaurants/${this.restaurantId}/categories/${this.selectedCategoryId}/items/${this.selectedItemId}`);

    const upload$ = this.http.post<any>(`${this.workerUrl}upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });

    return await new Promise<string>((resolve, reject) => {
      upload$.subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            const body = event.body || {};
            const publicUrl = body.publicUrl as string;
            if (!publicUrl) {
              reject(new Error('Worker did not return publicUrl'));
              return;
            }
            resolve(publicUrl);
          }
        },
        error: (error) => reject(error)
      });
    });
  }

  uploadFileWithProgress(uploadUrl: string, file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl, true);
      xhr.setRequestHeader('Content-Type', file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}: ${xhr.statusText}`));
        }
      };

      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(file);
    });
  }

  // --- Save changes (upload pending file if exists, then update DB) ---
  async saveChanges(): Promise<void> {
    if (this.selectedItem && this.selectedCategoryId && this.selectedItemId) {
      try {
        // If a file was selected, upload it first
        if (this.pendingFile) {
          this.uploading = true;
          this.uploadProgress = 0;
          const publicUrl = await this.uploadViaWorker(this.pendingFile);
          this.selectedItem.image = publicUrl;
        }

      const updatedItem: Product = {
        name: this.selectedItem.name,
        nameArabic: this.selectedItem.nameArabic,
        image: this.selectedItem.image,
        price: Number(this.selectedItem.price),
        ingredients: this.selectedItem.ingredients.split(',').map((ing: string) => ing.trim()).filter((ing: string) => ing.length > 0),
        ingredientsArabic: this.selectedItem.ingredientsArabic.split(',').map((ing: string) => ing.trim()).filter((ing: string) => ing.length > 0),
        // legacy arrays for compatibility
        choices: this.choiceOptions.map(o => o.en).filter(v => v && v.length > 0),
        choicesArabic: this.choiceOptions.map(o => o.ar).filter(v => v && v.length > 0),
        // new structured options
        choiceOptions: this.choiceOptions.map(o => ({ en: o.en, ar: o.ar, add: Number(o.add) || 0 }))
      };

      await this.menuService.editItem(this.restaurantId, this.selectedCategoryId, this.selectedItemId, updatedItem);

      alert(this.isArabic ? 'تم تحديث العنصر بنجاح!' : 'Item updated successfully!');
      this.onCategoryChange();

      } catch (error) {
        console.error('Error updating item:', error);
        alert(this.isArabic ? 'حدث خطأ أثناء تحديث العنصر.' : 'Error updating item. Please try again.');
      } finally {
        // Cleanup after save
        this.uploading = false;
        this.uploadProgress = 0;
        this.pendingFile = null;
        this.selectedFileName = null;
        if (this.previewUrl) {
          URL.revokeObjectURL(this.previewUrl);
          this.previewUrl = null;
        }
      }
    }
  }
    async deleteItem(): Promise<void> {
    if (this.selectedCategoryId && this.selectedItemId) {
      const confirmDelete = confirm(this.isArabic ? 'هل أنت متأكد أنك تريد حذف هذا العنصر؟' : 'Are you sure you want to delete this item?');
      if (!confirmDelete) return;

      try {
        await this.menuService.removeItem(this.restaurantId, this.selectedCategoryId, this.selectedItemId);
        alert(this.isArabic ? 'تم حذف العنصر بنجاح!' : 'Item deleted successfully!');
        this.onCategoryChange(); // reload items
        this.selectedItem = null;
        this.selectedItemId = '';
      } catch (error) {
        console.error('Error deleting item:', error);
        alert(this.isArabic ? 'حدث خطأ أثناء حذف العنصر.' : 'Error deleting item. Please try again.');
      }
    }
  }

}
