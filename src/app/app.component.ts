import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { Article } from './models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from './shared/prime-ng/prime-ng.module';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'waesche-system';

  allArticle: Article[] = [];
  laundryList: Article[] = [];

  // Paginator VARs
  first: number = 0;
  rows: number = 10;

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    // load all article
    try {
      this.allArticle = await this.supabase.getAllArticle();
      console.log('Artikel:', this.allArticle);
    } catch (error) {
      console.error('Fehler beim Abrufen:', error);
    }

    this.allArticle.forEach(a => a.amount = 0);
  }

  // liefert nur die Elemente der aktuellen Seite
  get paginatedArticles(): Article[] {
    return this.allArticle.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
  }


}
