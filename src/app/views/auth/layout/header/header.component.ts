import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarService } from '../../../public/services/sidebar.service';
import { map, Observable } from 'rxjs';
import { CartState } from '../../../../shared/interface/product.interface';
import { Store } from '@ngrx/store';
import { clearCart } from '../../store/product.actions';
@Component({
  selector: 'app-header',
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    BadgeModule,
    AvatarModule,
    MenuModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items!: MenuItem[];
  isMenuVisible: boolean = false;

  cartCount$: Observable<number>;

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
    this.cartCount$ = this.store
      .select('cart')
      .pipe(
        map((cart) => cart.products.reduce((acc, p) => acc + p.quantity, 0))
      );
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Bienvenido',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-wallet',
            routerLink: '/app-view/dashboard',
          },
          {
            label: 'Catálogo',
            icon: 'pi pi-shopping-bag',
            routerLink: '/app-view/catalog',
          },
          {
            label: 'Historial',
            icon: 'pi pi-phone',
            routerLink: '/app-view/history',
          },
          {
            label: 'Carrito de Compras',
            icon: 'pi pi-shopping-cart',
            badge: '2',
            routerLink: '/app-view/shopping-cart',
          },
          {
            label: 'Mi Perfil',
            icon: 'pi pi-user',
            routerLink: '/app-view/profile',
          },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
  closeMenu() {
    this.isMenuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menuElement = document.querySelector('.header-topbar-menu');
    const buttonElement = document.querySelector('.header-topbar-menu-button');
    const sidebarElement = document.querySelector('.menunav');
    const sidebarButtonElement = document.querySelector('#btnHamburger');

    if (
      menuElement &&
      buttonElement &&
      !menuElement.contains(event.target as Node) &&
      !buttonElement.contains(event.target as Node)
    ) {
      this.isMenuVisible = false;
    }

    // Si el clic es fuera del sidebar y el botón, cerramos el sidebar
    if (
      sidebarElement &&
      sidebarButtonElement &&
      !sidebarElement.contains(event.target as Node) &&
      !sidebarButtonElement.contains(event.target as Node)
    ) {
      this.sidebarService.setSidebarVisibility(false); // Cerramos el sidebar
    }

    // Si el menú está visible y el clic es fuera del menú y del sidebar, cerramos el sidebar
    if (
      this.isMenuVisible &&
      sidebarElement &&
      !sidebarElement.contains(event.target as Node)
    ) {
      this.sidebarService.setSidebarVisibility(false); // Cerramos el sidebar
    }
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  cerrarSesion() {
    this.store.dispatch(clearCart());
    localStorage.removeItem('usuario');
    this.router.navigate(['/auth/login']);
  }
}
