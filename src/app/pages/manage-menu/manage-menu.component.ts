import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { LanguageService } from '../../services/language.service';
import { HttpClient, HttpClientModule, HttpEventType } from '@angular/common/http';
import { ChoiceOption } from '../../models/product';

@Component({
  selector: 'app-manage-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.css']
})
export class ManageMenuComponent {
  restaurantId = '';

  categories: { [key: string]: { name: string; nameArabic: string; icon: string; section?: string } } = {};
  selectedCategoryId: string = '';

  newCategory = {
    name: '',
    nameArabic: '',
    catPhrase: '',
    catArabicPhrase: '',
    icon: '',
    section: 'kitchen' // default value
  };

  newItem = {
    name: '',
    nameArabic: '',
    price: 0,
    image: '',
    ingredients: '',
    ingredientsArabic: '',
    choices: '',
    choicesArabic: ''
  };

  // Choice builder (for new item)
  choiceDraft: { en: string; ar: string; add: number } = { en: '', ar: '', add: 0 };
  choiceEditIndex: number | null = null;
  choiceOptions: ChoiceOption[] = [];

  // Upload helpers
  previewUrl: string | null = null;
  uploading = false;
  uploadProgress = 0;
  pendingFile: File | null = null;
  selectedFileName: string | null = null;

  isArabic: boolean = false;
  private workerUrl = 'https://presigned-url-worker.a2-menu-worker.workers.dev/';

  constructor(
    private menuService: MenuService,
    private http: HttpClient,
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const rid = this.route.snapshot.paramMap.get('restId');
    if (rid) this.restaurantId = rid;
    this.menuService.getCategories(this.restaurantId).subscribe(data => {
      this.categories = data || {};
    });
    this.languageService.isArabic$.subscribe(value => (this.isArabic = value));
  }

  addCategory() {
    this.menuService.addCategory(this.restaurantId, this.newCategory).then(() => {
      alert(this.isArabic ? 'تمت إضافة الفئة!' : 'Category added!');
      this.newCategory = {
        name: '',
        nameArabic: '',
        catPhrase: '',
        catArabicPhrase: '',
        icon: '',
        section: 'kitchen'
      };
    });
  }

  async addItem() {
    if (!this.selectedCategoryId) {
      alert(this.isArabic ? 'اختر فئة أولاً!' : 'Select a category first!');
      return;
    }

    try {
      if (this.pendingFile) {
        this.uploading = true;
        this.uploadProgress = 0;
        const publicUrl = await this.uploadViaWorker(this.pendingFile);
        this.newItem.image = publicUrl;
      }

      const itemData = {
        ...this.newItem,
        ingredients: this.newItem.ingredients.split(',').map(i => i.trim()).filter(i => i.length > 0),
        ingredientsArabic: this.newItem.ingredientsArabic.split(',').map(i => i.trim()).filter(i => i.length > 0),
        // legacy arrays for compatibility
        choices: this.choiceOptions.map(o => o.en).filter(v => v && v.length > 0),
        choicesArabic: this.choiceOptions.map(o => o.ar).filter(v => v && v.length > 0),
        // new structured options
        choiceOptions: this.choiceOptions.map(o => ({ en: o.en, ar: o.ar, add: Number(o.add) || 0 }))
      } as any;

      await this.menuService.addItem(this.restaurantId, this.selectedCategoryId, itemData);
      alert(this.isArabic ? 'تمت إضافة العنصر!' : 'Item added!');
      this.newItem = { name: '', nameArabic: '', price: 0, image: '', ingredients: '', ingredientsArabic: '', choices: '', choicesArabic: '' };
      this.choiceOptions = [];
      this.choiceDraft = { en: '', ar: '', add: 0 };
      this.choiceEditIndex = null;
      this.clearPendingFile();
    } catch (err) {
      console.error('Error adding item:', err);
      alert(this.isArabic ? 'فشل إضافة العنصر. حاول مرة أخرى.' : 'Failed to add item. Please try again.');
    } finally {
      this.uploading = false;
      this.uploadProgress = 0;
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

  onFileSelected(event: any) {
    const file: File | null = event.target.files?.[0] || null;
    if (!file) return;
    if (!this.selectedCategoryId) {
      alert(this.isArabic ? 'اختر فئة أولاً، ثم اختر صورة.' : 'Select a category first, then choose an image.');
      return;
    }
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.previewUrl = URL.createObjectURL(file);
    this.pendingFile = file;
    this.selectedFileName = file.name;
  }

  private async uploadViaWorker(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('pathPrefix', `restaurants/${this.restaurantId}/categories/${this.selectedCategoryId}/new`);

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

  clearPendingFile(): void {
    this.pendingFile = null;
    this.selectedFileName = null;
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
      this.previewUrl = null;
    }
  }
}
