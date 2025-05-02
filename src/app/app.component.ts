import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { Article } from './models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from './shared/prime-ng/prime-ng.module';
import { PaginatorState } from 'primeng/paginator';
import { PrintPopupComponent } from './components/print-popup/print-popup.component';
import { FilterDescriptionPipe } from './shared/pipes/filter-description.pipe';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    PrintPopupComponent,
    FilterDescriptionPipe,
    NgOptimizedImage
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'waesche-system';

  allArticle: Article[] = [];
  laundryList: Article[] = [];
  filteredArticles: Article[] = [];

  // Paginator vars
  first: number = 0;
  rows: number = 10;

  visible: boolean = false;
  searchTerm: string = '';

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    // load all article
    try {
      this.allArticle = await this.supabase.getAllArticle();
    } catch (error) {
      console.error('Fehler beim Abrufen:', error);
    }
    this.allArticle.forEach(a => a.amount = 0);
  }

  // Elemente der aktuellen Seite
  get paginatedArticles(): Article[] {
    return this.allArticle.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSelectArticle(article: Article) {
    if (article.selected && article.amount > 0) {
      this.addArticleToLaundry(article)
    }
    if (article.selected === false) {
      article.amount = 0;
      this.deleteArticleFromLaundry(article)
    }
  }

  onChangeAmount(article: Article) {
    article.selected = false;
  }

  addArticleToLaundry(article: Article) {
    const existingIndex = this.laundryList.findIndex(item => item.id === article.id)
    if (existingIndex === -1) {
      this.laundryList.push(article);
      this.laundryList.sort((a, b) => a.id - b.id);
    }
  }

  deleteArticleFromLaundry(article: Article) {
    const existingIndex = this.laundryList.findIndex(item => item.id === article.id)
    this.laundryList.splice(existingIndex, 1);
  }

  showDialog() {
    this.visible = true;
  }
}
