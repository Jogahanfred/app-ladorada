import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.css'
})
export class PublicLayoutComponent {
mostrarHolaMundo = true;

@HostListener('window:scroll', [])
onWindowScroll() {
  const mainContent = document.querySelector('.min-h-screen');
  const top = mainContent?.getBoundingClientRect().top || 0;

  // Mostrar si estamos por encima de 90px, ocultar si llegamos a 90 o menos
  this.mostrarHolaMundo = top > 90;
}
}
