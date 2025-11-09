import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentService, CrudResponse } from '../../content/content.service'; 

@Component({
  selector: 'app-article-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './article-create.html', 
  styleUrls: ['./article-create.css']
})
export class ArticleCreate implements OnInit { 
  articleForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contentService: ContentService, // <-- ContentService se injektuje
    private router: Router
  ) {
    this.articleForm = this.fb.group({
      naslov: ['', Validators.required],
      deskripcija: ['', Validators.required],
      img: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.articleForm.valid) {
   
      this.contentService.createArticle(this.articleForm.value).subscribe({
        next: (response: CrudResponse) => { 
          if (response.success) {
            this.successMessage = response.message || 'Članak uspješno kreiran!';
            this.articleForm.reset();
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = response.message || 'Kreiranje članka nije uspjelo.';
          }
        },
        error: (error: any) => { 
          this.errorMessage = 'Greška pri komunikaciji sa serverom. (Provjerite create.php endpoint).';
          console.error('Create article error:', error);
        }
      });
    } else {
      this.errorMessage = 'Molimo popunite sva polja ispravno.';
    }
  }
}