import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CurrentTempService } from './core/services/current-temp.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SkeletonModule, TableModule, FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  faArrowUp = faArrowUp;
  currentTempService = inject(CurrentTempService)
  products!: any[];

  ngOnInit() {
      this.products = Array.from({ length: 5 }).map((_, i) => `Item #${i}`);
  }
}
