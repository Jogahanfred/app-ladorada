import { createAction, props } from '@ngrx/store'; 
import { Product } from '../../../shared/interface/product.interface';

export const addProduct = createAction(
  '[Cart] Add Product',
  props<{ product: Product }>()
);

export const removeProduct = createAction(
  '[Cart] Remove Product',
  props<{ id: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ id: number, quantity: number }>()
);

export const applyDiscount = createAction(
  '[Cart] Apply Discount',
  props<{ id: number, discountPercentage: number }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

