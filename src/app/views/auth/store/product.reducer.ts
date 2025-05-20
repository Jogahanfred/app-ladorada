// src/app/store/product.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addProduct, removeProduct, updateQuantity, applyDiscount, clearCart } from './product.actions';
import { CartState, initialCartState, Product  } from '../../../shared/interface/product.interface'; 

function getDiscountedPrice(product: Product): number {
  const discount = product.discount?.hasDiscount ? product.discount.percentage : 0;
  return product.price * (1 - discount / 100);
}

export const cartReducer = createReducer(
  initialCartState,

  // ➕ Agregar producto
  on(addProduct, (state, { product }) => {
    const existingProduct = state.products.find(p => p.id === product.id);
    const priceWithDiscount = getDiscountedPrice(product);

    if (existingProduct) {
      const updatedProducts = state.products.map(p =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
      return {
        ...state,
        products: updatedProducts,
        total: state.total + priceWithDiscount,
        subtotal: state.subtotal + priceWithDiscount
      };
    } else {
      return {
        ...state,
        products: [...state.products, { ...product, quantity: 1 }],
        total: state.total + priceWithDiscount,
        subtotal: state.subtotal + priceWithDiscount
      };
    }
  }),

  // 🗑️ Eliminar producto
  on(removeProduct, (state, { id }) => {
    const productToRemove = state.products.find(p => p.id === id);
    if (!productToRemove) return state;

    const priceWithDiscount = getDiscountedPrice(productToRemove) * productToRemove.quantity;

    return {
      ...state,
      products: state.products.filter(p => p.id !== id),
      total: state.total - priceWithDiscount,
      subtotal: state.subtotal - priceWithDiscount
    };
  }),

  // 🔄 Actualizar cantidad
  on(updateQuantity, (state, { id, quantity }) => {
    const productToUpdate = state.products.find(p => p.id === id);
    if (!productToUpdate) return state;

    const oldTotal = getDiscountedPrice(productToUpdate) * productToUpdate.quantity;
    const newTotal = getDiscountedPrice(productToUpdate) * quantity;

    const updatedProducts = state.products.map(p =>
      p.id === id ? { ...p, quantity } : p
    );

    return {
      ...state,
      products: updatedProducts,
      total: state.total + (newTotal - oldTotal),
      subtotal: state.subtotal + (newTotal - oldTotal)
    };
  }),

  // 🧹 Vaciar carrito
  on(clearCart, () => ({
    ...initialCartState
  })),

  // (opcional) aplicar descuento dinámico desde otra parte
  on(applyDiscount, (state, { id, discountPercentage }) => {
    const updatedProducts = state.products.map(p =>
      p.id === id
        ? {
            ...p,
            discount: {
              hasDiscount: true,
              percentage: discountPercentage
            }
          }
        : p
    );

    const newTotal = updatedProducts.reduce((sum, p) => {
      return sum + getDiscountedPrice(p) * p.quantity;
    }, 0);

    return {
      ...state,
      products: updatedProducts,
      total: newTotal,
      subtotal: newTotal
    };
  })
);