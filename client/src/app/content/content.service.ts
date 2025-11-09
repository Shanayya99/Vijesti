import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ArticlePayload {
  naslov: string;
  deskripcija: string;
  img: string;
  created_at: string;
  updated_at: string | null;
}

export interface CrudResponse {
  success: boolean;
  message: string;
}

export interface Article extends ArticlePayload {
  id: number;
}

export interface ArticlesResponse {
    success: boolean;
    articles: Article[];
    message?: string;
}

export interface Book {
  id: number;
  naslov: string;
  autor: string;
  godina: number;
}
// ------------------------------------

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly BASE_URL = 'http://localhost/WP_2_Medina_Mustacevic';
  private readonly ARTICLE_CREATE_URL = `${this.BASE_URL}/api/vijesti/create.php`; 
  private readonly ARTICLE_READ_URL = `${this.BASE_URL}/api/vijesti/get.php`;
  private readonly ARTICLE_UPDATE_URL = `${this.BASE_URL}/api/vijesti/update.php`; 
  private readonly ARTICLE_DELETE_URL = `${this.BASE_URL}/api/vijesti/delete.php`; 
  private readonly BOOKS_URL = `${this.BASE_URL}/api/knjige/get.php`; 
  
  constructor(private http: HttpClient) { } 

  getArticles(): Observable<ArticlesResponse> {
    return this.http.get<ArticlesResponse>(this.ARTICLE_READ_URL, { withCredentials: true }); 
  }

  createArticle(payload: ArticlePayload): Observable<CrudResponse> {
    return this.http.post<CrudResponse>(this.ARTICLE_CREATE_URL, payload, { withCredentials: true });
  }
  
  getArticleById(id: number): Observable<{ success: boolean, article: Article }> {
      return this.http.get<{ success: boolean, article: Article }>(`${this.ARTICLE_READ_URL}?id=${id}`, { withCredentials: true });
  }

  updateArticle(article: Article): Observable<CrudResponse> {
      return this.http.put<CrudResponse>(this.ARTICLE_UPDATE_URL, article, { withCredentials: true });
  }
  
  deleteArticle(id: number): Observable<CrudResponse> {
      return this.http.delete<CrudResponse>(`${this.ARTICLE_DELETE_URL}?id=${id}`, { withCredentials: true });
  }

  getBooks(): Observable<{ success: boolean, books: Book[] }> {
    return this.http.get<{ success: boolean, books: Book[] }>(this.BOOKS_URL);
  }
}