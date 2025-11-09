import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; 
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common'; 
import { ContentService, Article, CrudResponse } from '../../content/content.service';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DatePipe], 
  templateUrl: './article-edit.html',
  styleUrls: ['./article-edit.css']
})
export class ArticleEdit implements OnInit {
  articleForm: FormGroup;
  
  articleId!: number; 
  errorMessage: string = '';
  successMessage: string = '';
  loading: boolean = true;
  originalArticle: Article | undefined; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute, 
    private contentService: ContentService, 
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      naslov: ['', Validators.required],
      deskripcija: ['', Validators.required],
      img: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });
  }

  ngOnInit(): void {
    this.route.params.pipe(
      filter(params => params['id'] != null),
      switchMap(params => {
        this.articleId = +params['id']; 
        this.loading = true;
        return this.contentService.getArticleById(this.articleId);
      })
    ).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success && res.article) {
          this.articleForm.patchValue(res.article); 
          this.originalArticle = res.article; 
        } else {
          this.errorMessage = 'Članak nije pronađen.';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Greška pri učitavanju podataka za izmjenu.';
      }
    });
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.articleForm.valid && this.articleId && this.originalArticle) { 
        
        if (this.articleForm.pristine) {
            this.errorMessage = 'Nema promjena za ažuriranje.';
            return;
        }

        const updatedArticle: Article = { 
            ...this.articleForm.value, 
            id: this.articleId,
            created_at: this.originalArticle.created_at, 
            updated_at: new Date().toISOString(), 
        } as Article;

        this.contentService.updateArticle(updatedArticle).subscribe({
            next: (response: CrudResponse) => {
                if (response.success) {
                    this.successMessage = response.message || 'Članak uspješno ažuriran!';
                    this.router.navigate(['/novosti']); 
                } else {
                    this.errorMessage = response.message || 'Ažuriranje nije uspjelo.';
                }
            },
            error: (error) => {
                this.errorMessage = error.error?.message || 'Greška pri komunikaciji s backendom.';
            }
        });
    } else {
        this.errorMessage = 'Molimo popunite sva obavezna polja.';
    }
  }
}