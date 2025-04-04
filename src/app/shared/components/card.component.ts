import { Component, Input } from "@angular/core";
import { SkeletonModule } from 'primeng/skeleton';
import { CommonModule } from "@angular/common";

@Component({
    selector: 'card',
    imports: [SkeletonModule, CommonModule],
    template: `
    <p-skeleton *ngIf="loading" width="100%" height="6rem" />
    <div *ngIf="!loading" class="p-4 rounded-lg border border-gray-200 w-full shadow-lg overflow-x-scroll">
        <h1 *ngIf="header" class="font-semibold mb-1 text-gray-500 text-sm">{{header}}</h1>
        <ng-content></ng-content>
    </div>
    `
})

export class CardComponent {
    @Input() loading?: boolean;
    @Input() header?: string;
}