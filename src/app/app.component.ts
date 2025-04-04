import { Component, inject } from '@angular/core';
import { CurrentTempService } from './core/services/current-temp.service';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  imports: [CommonModule, SkeletonModule, TableModule, FontAwesomeModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  math = Math;
  faLocationDot = faLocationDot;
  currentTempService = inject(CurrentTempService)
}
