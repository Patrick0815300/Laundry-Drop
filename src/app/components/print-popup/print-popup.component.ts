import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/prime-ng/prime-ng.module';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


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

  constructor(private cdr: ChangeDetectorRef) { }

  printPdf() {
    const element = document.getElementById('print-section');
    if (!element) {
      console.error('Druck-Bereich nicht gefunden!');
      return;
    }
    const { width, height } = element.getBoundingClientRect();
    console.log(`Größe: ${width}×${height}`);
    if (width === 0 || height === 0) {
      console.error('Element hat Null-Größe – CSS prüfen!');
      return;
    }
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = canvas.height * pdfWidth / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Projekt-Artikel.pdf');
    });
  }
}
