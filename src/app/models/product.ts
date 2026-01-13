export interface Product {
  name: string;
  nameArabic: string;
  image: string;
  price: number;
  ingredients: string[];
  ingredientsArabic: string[];
  choices?: string[];
  choicesArabic?: string[];
  choiceOptions?: ChoiceOption[];
}

export interface ChoiceOption {
  en: string;
  ar: string;
  add: number;
}
