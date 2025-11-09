import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, AuthResponse } from '../auth.service'; 
import { UserService } from '../../user/user.service'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './login.html', 
  styleUrls: ['./login.css']
})
export class Login implements OnInit { 
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.errorMessage = '';
    
    if (this.loginForm.valid) {
      console.log("--- DEBUG PAYLOAD ---");
        console.log("Username koji se šalje:", this.loginForm.value.username);
        console.log("Password koji se šalje:", this.loginForm.value.password);
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: AuthResponse) => {
          if (response.success) {
            this.router.navigate(['/pocetna']); 
          } else {
            this.errorMessage = response.message || 'Korisničko ime ili šifra nisu ispravni.';
          }
        },
        error: (error) => {
          this.errorMessage = 'Greška pri komunikaciji sa serverom. Provjerite PHP endpoint.';
          console.error('Login error:', error);
        }
      });
    } else {
      this.errorMessage = 'Molimo popunite sva obavezna polja.';
    }
  }
}