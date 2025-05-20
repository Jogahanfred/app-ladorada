import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { RippleModule } from 'primeng/ripple';
import { ProductService } from '../../../auth/services/product/product.service';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../../shared/interface/product.interface';

@Component({
  selector: 'app-product',
  imports: [
    CommonModule,
    // BrowserModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    RippleModule,
    DialogModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  standalone: true,
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  responsiveOptions: any[] = [];
  loadingCatalogProduct = false;
  catalogDetailDialog: boolean = false;
  selectedProduct: Product | null = null;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.loadingCatalogProduct = true;
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.loadingCatalogProduct = false;
    });
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string): any {
    switch (status) {
      case 'STOCK':
        return 'success';
      case 'STOCK MEDIO':
        return 'warn';
      case 'SIN STOCK':
        return 'danger';
      default:
        return 'undefined';
    }
  }

  openProductDetail(product: Product) {
    this.selectedProduct = product;
    this.catalogDetailDialog = true;
  }

  hideDialog() {
    this.catalogDetailDialog = false;
    this.selectedProduct = null;
  }
}
