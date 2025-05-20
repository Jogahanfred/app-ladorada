export interface Product {
  id: number;
  name: string;
  subName: string;
  image: string;
  price: number;
  inventoryStatus: string;
  description: string;
  longDescription: string;
  nutritionalFeatures: string[];
  certifications: {
    [key: string]: boolean;
  };
  discount: {
    hasDiscount: boolean;
    percentage: number;
  };
  origin: string;
  accompaniment: string;
  quantity: number;
}


export interface CartState {
  products: Product[];
  total: number;
  subtotal: number;
  discount: number;
}

export const initialCartState: CartState = {
  products: [],
  total: 0,
  subtotal: 0,
  discount: 0,
};