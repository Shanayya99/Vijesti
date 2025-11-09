import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http'; 
import { ContentService, ArticlesResponse, Article, CrudResponse } from '../content/content.service'; 

interface Book { id: number; naslov: string; autor: string; godina: number; created_at: string; updated_at: string; }
interface BooksResponse { success: boolean; books: Book[]; message?: string; }


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe], 
  templateUrl: './home.html', 
  styleUrls: ['./home.css'] 
})
export class Home implements OnInit {
  articles: Article[] = []; 
  books: Book[] = []; 
  errorMessage: string = '';
  loading: boolean = false; 
  
  viewMode: 'home' | 'books' = 'home'; 

  private readonly BOOKS_URL = 'http://localhost/WP_2_Medina_Mustacevic/api/knjige/get.php'; 

  constructor(
    public userService: UserService, 
    private http: HttpClient,
    private contentService: ContentService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadArticles(); 
  }

  loadArticles(): void {
    this.loading = true;
    this.errorMessage = '';

    this.contentService.getArticles().subscribe({
      next: (response: ArticlesResponse) => {
        this.loading = false;
        if (response.success && Array.isArray(response.articles)) {
          this.articles = response.articles;
          this.errorMessage = '';
          console.log('Articles loaded:', this.articles);
        } else {
          this.errorMessage = response.message || 'Greška pri učitavanju vijesti.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Greška pri komunikaciji sa serverom.';
        console.error('Error loading articles:', err);
      }
    });
  }
  
  deleteArticle(id: number, naslov: string): void {
      if (!this.userService.isAdmin()) {
          alert('Brisanje je dozvoljeno isključivo administratorima.');
          return;
      }
      
      if (window.confirm(`Da li ste sigurni da želite obrisati članak: ${naslov}?`)) {
          this.contentService.deleteArticle(id).subscribe({
              next: (res: CrudResponse) => {
                  if (res.success) {
                      alert('Članak uspješno obrisan!');
                      this.loadArticles();
                  } else {
                      alert(res.message || 'Greška pri brisanju na serveru.');
                  }
              },
              error: (err: any) => {
                  alert('Greška pri komunikaciji sa serverom prilikom brisanja.');
              }
          });
      }
  }
  
  editArticle(id: number): void {
      if (!this.userService.isAdmin()) {
          alert('Izmjena je dozvoljena isključivo administratorima.');
          return;
      }
      alert(`Preusmjeravanje na formu za izmjenu članka ID: ${id}`);
      this.router.navigate(['/admin/edit-article', id]);
  }

  loadBooks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.http.get<BooksResponse>(this.BOOKS_URL).subscribe({
      next: (response) => {
        this.loading = false;
        if (response.success && Array.isArray(response.books)) {
          this.books = response.books;
          this.errorMessage = '';
        } else {
          this.errorMessage = response.message || 'Greška pri učitavanju knjiga.';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = 'Greška pri komunikaciji s API-jem za knjige.';
      }
    });
  }
  
  setViewMode(mode: 'home' | 'books'): void {
    this.viewMode = mode;
    if (mode === 'books' && this.books.length === 0) {
      this.loadBooks();
    }
  }
}