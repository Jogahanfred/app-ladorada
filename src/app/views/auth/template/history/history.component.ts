import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../../services/purchase/purchase.service';
import { Purchase } from '../../../../shared/interface/purchase.interface';

import { TableModule } from 'primeng/table';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-history',
  imports: [TableModule, DatePipe, CommonModule, ButtonModule, DialogModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  providers: [DatePipe],
})
export class HistoryComponent implements OnInit {
  purchases: Purchase[] = [];
  responsiveOptions: any[] = [];
  purchaseDialog = false;
  selectedPurchase: Purchase | null = null;
  loadingPurchases: boolean = false;
  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadingPurchases = true;
    this.purchaseService.getPurchases().subscribe((data) => {
      this.purchases = data;
      this.loadingPurchases = false;
      console.log('PURCHASE', this.purchases);
    });
  }

  openDetail(purchase: Purchase) {
    this.selectedPurchase = purchase;
    console.log(this.selectedPurchase.DetallesCompra);
    this.purchaseDialog = true;
  }

  hideDialog() {
    this.purchaseDialog = false;
    this.selectedPurchase = null;
  }
}
