export interface Category {
  id:      number;
  name:    string;
  typeImg: string;
}

export interface Product {
  id:          number;
  title:       string;
  price:       number;
  description: string;
  category:    Category;
  images:      string[];
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number
}
