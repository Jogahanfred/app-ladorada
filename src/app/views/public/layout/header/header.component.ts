import { Component, HostListener, ViewChild } from '@angular/core';

import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar.service';
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
  constructor(public sidebarService: SidebarService) {}
  ngOnInit(): void {
    this.items = [
      // {
      //   separator: true,
      // },
      // {
      //   label: 'Documents',
      //   items: [
      //     {
      //       label: 'New',
      //       icon: 'pi pi-plus',
      //       shortcut: '⌘+N',
      //     },
      //     {
      //       label: 'Search',
      //       icon: 'pi pi-search',
      //       shortcut: '⌘+S',
      //     },
      //   ],
      // },
      {
        label: 'Accede a',
        items: [
          {
            label: 'Nosotros',
            icon: 'pi pi-wallet',
            shortcut: '⌘+O',
            routerLink: '/public/main',
          },
          {
            label: 'Productos',
            icon: 'pi pi-shopping-bag',
            shortcut: '⌘+O',
            routerLink: '/public/product',
          },
          {
            label: 'Contacto',
            icon: 'pi pi-phone',
            badge: '2',
            routerLink: '/public/contact',
          },
          //  {
          //     separator: true,
          //   },
          // {
          //   label: 'Cerrar Sesión',
          //   icon: 'pi pi-sign-out',
          //   shortcut: '⌘+Q',
          // },
        ],
      },
      {
        separator: true,
      },
    ];
  }

  toggleMenu() {
    console.log('Menu toggled');
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

    // Si el clic es fuera del menú y el botón, cerramos el menú
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

  
}
