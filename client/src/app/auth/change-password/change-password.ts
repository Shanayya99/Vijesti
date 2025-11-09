import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, AuthResponse } from '../auth.service';
import { ContentService, CrudResponse } from '../../content/content.service'; 
export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('new_password')?.value;
  const confirmPassword = control.get('confirm_new_password')?.value;

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
};


@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.html',
  styleUrls: ['./change-password.css']
})
export class ChangePassword implements OnInit {
  passwordForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      current_password: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_new_password: ['', Validators.required]
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    
    if (this.passwordForm.valid) {
      this.authService.changePassword(this.passwordForm.value).subscribe({
        next: (response: CrudResponse) => {
          if (response.success) {
            alert('Lozinka je uspješno promijenjena. Molimo prijavite se ponovo.');
            this.authService.logout().subscribe(() => { 
                this.router.navigate(['/login']); 
            });
          } else {
            this.errorMessage = response.message || 'Promjena lozinke nije uspjela.';
          }
        },
        error: (error: any) => { 
          this.errorMessage = error.error?.message || 'Greška u komunikaciji sa serverom.';
          console.error('Change password error:', error);
        }
      });
    }
  }

  get control() {
    return this.passwordForm.controls;
  }
}