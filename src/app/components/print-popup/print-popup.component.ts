import { Component, Input } from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/prime-ng/prime-ng.module';

@Component({
  selector: 'app-print-popup',
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  templateUrl: './print-popup.component.html',
  styleUrl: './print-popup.component.scss'
})
export class PrintPopupComponent {
  @Input() laundry!: Article[]


}
