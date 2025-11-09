import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../auth.service';

// Custom Validator: Provjerava da li su šifra i potvrda šifre iste
export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('password_confirm')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], 
  templateUrl: './register.html', 
  styleUrls: ['./register.css']
})
export class Register implements OnInit { 
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void { }

 onSubmit(): void {
    this.errorMessage = '';
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        
        next: (response) => {
          if (response.success) {
            alert('Registracija uspješna! Sačekajte odobrenje administratora.');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = response.message || 'Registracija neuspješna. Pokušajte ponovo.';
          }
        },
        
        error: (error: any) => { 
          if (error.error && error.error.message) {
             this.errorMessage = error.error.message; 
          } else {
             this.errorMessage = 'Greška pri komunikaciji sa serverom. Provjerite PHP endpoint.';
             console.error('Registration error:', error);
          }
        }
      });
    } else {
      this.errorMessage = 'Molimo popunite sva polja ispravno.';
    }
  }

  get control() {
    return this.registerForm.controls;
  }
}
