import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { PrimeNG } from 'primeng/config';
import { CartState } from './shared/interface/product.interface';
import { saveCartState } from './views/auth/store/local-storage';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private store: Store<{ cart: CartState }>) {
    this.store.select('cart').subscribe((cartState) => {
      saveCartState(cartState);
    });
  }
}
