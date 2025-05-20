import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  CartState,
  Product,
} from '../../../../shared/interface/product.interface';
import {
  addProduct,
  applyDiscount,
  clearCart,
  removeProduct,
  updateQuantity,
} from '../../store/product.actions';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { PurchaseService } from '../../services/purchase/purchase.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [
    NgIf,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    DialogModule,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
  providers: [MessageService],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart$ = this.store.select('cart');
  cartData: CartState = { products: [], total: 0, subtotal: 0, discount: 0 };

  selectedPaymentMethod: 'TARJETA' | 'BILLETERA' | 'EFECTIVO' = 'EFECTIVO';
  selectedTermsAndConditions: boolean = false;
  termsAndConditionsDialog = false;
  btnLoading: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<{ cart: CartState }>,
    private messageService: MessageService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cart$.subscribe((cart) => {
      this.cartData = cart;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeProductFromCart(productId: number) {
    this.store.dispatch(removeProduct({ id: productId }));
  }

  updateProductQuantity(productId: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);

    if (quantity > 0) {
      this.store.dispatch(updateQuantity({ id: productId, quantity }));
    }
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  applyDiscountToProduct(productId: number, event: Event) {
    const input = event.target as HTMLInputElement;
    const discountPercentage = parseFloat(input.value);

    if (
      !isNaN(discountPercentage) &&
      discountPercentage >= 0 &&
      discountPercentage <= 100
    ) {
      this.store.dispatch(applyDiscount({ id: productId, discountPercentage }));
    }
  }
  proccessPay() {
    if (!this.selectedTermsAndConditions) {
      this.messageService.add({
        severity: 'info',
        summary: 'Informativo',
        detail: 'Debe aceptar los términos y condiciones',
        life: 3000,
      });
      return;
    }
    this.btnLoading = true;

    const fechaCompra = new Date().toISOString().split('T')[0];

    const detalles = this.cartData.products.map((product) => {
      const precioUnitario = product.price;
      const cantidad = product.quantity;
      const tieneDescuento = product.discount?.hasDiscount ?? false;
      const porcentajeDescuento = product.discount?.percentage ?? 0;

      const subtotal = precioUnitario * cantidad;
      const descuento = tieneDescuento
        ? subtotal * (porcentajeDescuento / 100)
        : 0;
      const total = subtotal - descuento;

      return {
        No_producto_id: product.id,
        Tx_nombre_producto: product.name,
        Qt_cantidad: cantidad,
        Ss_precio_unitario: precioUnitario,
        Ss_descuento_producto: descuento,
        Ss_subtotal: total,
        Ss_total: subtotal,
      };
    });

    const jsonFinal = {
      Fe_fecha_compra: fechaCompra,
      Ss_total_items: this.itemTotal,
      Ss_descuento: this.totalDiscount,
      Ss_subtotal: this.subtotal,
      Ss_envio: 0,
      Ss_impuesto: this.tax,
      Qt_cantidad_items: this.totalItems,
      Tx_estado: 'Confirmado',
      Ss_total_compra: this.totalToPay,
      DetallesCompra: detalles,
    };

    this.purchaseService.savePurchase(jsonFinal).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'La compra fue registrada correctamente',
          life: 3000,
        });
        this.clearCart();
        this.btnLoading = false;
      },
      error: (error) => {
        this.btnLoading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar la compra',
          life: 3000,
        });
      },
    });
  }

  openTermsAndConditions() {
    this.termsAndConditionsDialog = true;
  }

  hideTermsAndConditions() {
    this.termsAndConditionsDialog = false;
    this.selectedTermsAndConditions = true;
  }

  get itemTotal(): number {
    return this.cartData.products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }

  get totalDiscount(): number {
    return this.cartData.products.reduce((total, product) => {
      if (product.discount?.hasDiscount) {
        const discountAmount =
          product.price *
          (product.discount.percentage / 100) *
          product.quantity;
        return total + discountAmount;
      }
      return total;
    }, 0);
  }

  get subtotal(): number {
    return this.itemTotal - this.totalDiscount;
  }

  get tax(): number {
    if (this.selectedPaymentMethod === 'TARJETA') {
      return this.subtotal * 0.05;
    }
    return 0;
  }

  get totalToPay(): number {
    return this.subtotal + this.tax;
  }

  get totalItems(): number {
    return this.cartData.products.reduce(
      (sum, product) => sum + product.quantity,
      0
    );
  }
}
