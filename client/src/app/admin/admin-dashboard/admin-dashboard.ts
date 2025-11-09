import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, AuthResponse } from '../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../user/user.service';

interface PendingUser {
  id: number; 
  ime: string;
  prezime: string;
  username: string;
  email: string;
  status: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  pendingRequests: PendingUser[] = [];
  errorMessage: string = '';
  
  private readonly BASE_URL = 'http://localhost/WP_2_Medina_Mustacevic';
  
  constructor(
    private authService: AuthService, 
    private http: HttpClient,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.errorMessage = '';
    // Logika učitavanja liste
    this.http.get<{success: boolean, users: PendingUser[], message?: string}>(`${this.BASE_URL}/get_pending_users.php`).subscribe({
      next: (data) => {
        if (data.success && Array.isArray(data.users)) {
             this.pendingRequests = data.users;
             if (this.pendingRequests.length === 0) {
                 this.errorMessage = 'Nema zahtjeva na čekanju.';
             }
        } else {
            this.errorMessage = data.message || 'Greška pri dohvaćanju zahtjeva.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Greška u komunikaciji sa serverom (Provjerite get_pending_users.php).';
        console.error('Error:', err);
      }
    });
  }

  handleAction(id: number, action: 'approve' | 'reject'): void {
    this.errorMessage = '';
    
    if (!id || id <= 0) {
        this.errorMessage = "Greška: ID korisnika je nevažeći. Akcija je zaustavljena.";
        return; 
    }

    const adminData = this.userService.currentUserValue;
    const payload = {
        admin_username: adminData?.username,
        id: id, 
        action: action
    };

    console.log("-----------------------------------------");
    console.log("PAYLOAD ZA APPROVE_USER.PHP:", payload);
    console.log("-----------------------------------------");

   
    this.authService.approveOrRejectUser(payload as any).subscribe({ 
      next: (response: AuthResponse) => {
        if (response.success) {
          alert(`Korisnik ${id} uspješno ${action === 'approve' ? 'odobren' : 'odbijen'}.`);
          this.pendingRequests = this.pendingRequests.filter(u => u.id !== id);
        } else {
          this.errorMessage = response.message || `Akcija ${action} nije uspjela.`;
        }
      },
      error: (err) => {
        this.errorMessage = 'Greška u komunikaciji sa serverom.';
        console.error('Error:', err);
      }
    });
  }

  approveUser(id: number): void {
    this.handleAction(id, 'approve');
  }

  rejectUser(id: number): void {
    this.handleAction(id, 'reject');
  }
}