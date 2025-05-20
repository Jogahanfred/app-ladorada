import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { CartState, Product } from '../../../../shared/interface/product.interface';
import { ProductService } from '../../services/product/product.service';
import { Store } from '@ngrx/store';
import { addProduct } from '../../store/product.actions';

@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    DialogModule,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  responsiveOptions: any[] = [];
  catalogDetailDialog = false;
  selectedProduct: Product | null = null;
  loadingCatalogProduct = false;

  constructor(private productService: ProductService, private store: Store<{ cart: CartState }>) {}

  ngOnInit() {
    this.loadingCatalogProduct = true;
    this.responsiveOptions = [
      { breakpoint: '1024px', numVisible: 3, numScroll: 3 },
      { breakpoint: '768px', numVisible: 2, numScroll: 2 },
      { breakpoint: '560px', numVisible: 1, numScroll: 1 },
    ];

    this.productService.getProducts().subscribe((data) => {  
      this.products = data;
      this.loadingCatalogProduct = false; 
    });
  }

  getSeverity(status: string): any {
    switch (status.toLowerCase()) {
      case 'disponible':
        return 'success';
      case 'pocas unidades':
        return 'warn';
      case 'agotado':
        return 'danger';
      default:
        return 'info';
    }
  }

  openCatalogDetail(product: Product) {
    this.selectedProduct = product;
    this.catalogDetailDialog = true;
  }

  hideDialog() {
    this.catalogDetailDialog = false;
    this.selectedProduct = null;
  }

  addToCart(product: Product) {
    this.store.dispatch(addProduct({ product }));
  }
}
