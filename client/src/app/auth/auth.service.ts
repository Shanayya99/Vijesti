import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service'; 

export interface AuthResponse {
 success: boolean; 
 message: string; 
 user_type?: 'admin' | 'standard'; 
}

@Injectable({ providedIn: 'root' })
export class AuthService {
private readonly BASE_URL = 'http://localhost/WP_2_Medina_Mustacevic'; 

constructor(private http: HttpClient, private userService: UserService) { } 

login(payload: any): Observable<AuthResponse> {
return this.http.post<AuthResponse>(`${this.BASE_URL}/login.php`, payload, { withCredentials: true }).pipe(
tap(response => {
 if (response.success && response.user_type) {
 this.userService.setUser({
 username: payload.username, 
 role: response.user_type, 
 });
 }
})
);
 }
 
 register(payload: any): Observable<AuthResponse> {    return this.http.post<AuthResponse>(`${this.BASE_URL}/register.php`, payload, { withCredentials: true });   }

 changePassword(payload: any): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.BASE_URL}/change_password.php`, payload, { withCredentials: true });  }
 logout(): Observable<any> {
 return this.http.get(`${this.BASE_URL}/logout.php`, { withCredentials: true }).pipe(
tap(() => this.userService.clearUser()) 
 );
 }
 
 approveOrRejectUser(payload: {id: number, action: 'approve' | 'reject' }): Observable<AuthResponse> {    const adminData = this.userService.currentUserValue;
 
 const requestPayload = {
 admin_username: adminData?.username,
 id: payload.id,
action: payload.action
 };
 
 return this.http.post<AuthResponse>(`${this.BASE_URL}/approve_user.php`, requestPayload, { withCredentials: true });
 }
}