import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './services/supabase.service';
import { Article } from './models/article';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'waesche-system';

  allArticle: Article[] = [];
  laundryList: Article[] = [];

  constructor(private supabase: SupabaseService) { }

  async ngOnInit() {
    // load all article
    try {
      this.allArticle = await this.supabase.getAllArticle();
      console.log('Artikel:', this.allArticle);
    } catch (error) {
      console.error('Fehler beim Abrufen:', error);
    }

    this.setAmount();
  }

  // set amount of all article 
  setAmount() {
    this.allArticle.forEach(article => {
      article.amount = 0;
    });
  }


}
