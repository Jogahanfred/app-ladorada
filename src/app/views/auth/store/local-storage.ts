export const CART_KEY = 'cart_state';

export function saveCartState(state: any): void {
  localStorage.setItem(CART_KEY, JSON.stringify(state));
}

export function loadCartState(): any {
  const state = localStorage.getItem(CART_KEY);
  return state ? JSON.parse(state) : undefined;
}