import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css',
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: any[] = [];

  ngOnInit(): void {
    if (this.items.length === 0 || this.items[0].name !== '') {
      this.items = [{ name: '' }, ...this.items];
    }
  }

  getClassLi(isFirst: boolean, isLast: boolean): string {
    const baseClasses = 'relative';

    if (isFirst) {
      return `${baseClasses}`;
    }

    if (isLast) {
      return `${baseClasses} text-gray-600 uppercase mx-0.5`;
    }

    return `${baseClasses} text-[#270B73] uppercase relative mx-1`;
  }
  getClassSpan(isFirst: boolean, isLast: boolean): string {
    if (isFirst) {
      return `after:content-[''] after:absolute after:w-0.5 after:h-4 after:top-[1.5px] after:bg-[#270B73] after:rounded after:rotate-20 after:ml-[27.5px]`;
    }

    if (!isLast) {
      return `after:content-[''] after:absolute after:w-0.5 after:h-4 after:top-1 after:bg-[#270B73] after:rounded after:rotate-20 after:ml-2`;
    }

    return '';
  }
}
