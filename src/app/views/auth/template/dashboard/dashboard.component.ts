import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

import { Dashboard } from '../../../../shared/interface/dashboard.interface';
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard | null = null;
  loadingStats: boolean = false;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadingStats = true;
    this.dashboardService.getDashboard().subscribe((data) => {
      this.dashboard = data;
      this.loadingStats = false;
      console.log('DASHBOARD', this.dashboard);
    });
  }
}
