import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { map } from 'rxjs/operators'; 
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  currentUser$: Observable<any>; 
  menuOpen = false; 

  constructor(
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUser$ = this.userService.currentUser$;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Logout error:', error);
        this.userService.clearUser(); 
        this.router.navigate(['/login']);
      }
    });
  }

  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen; 
  }
}
