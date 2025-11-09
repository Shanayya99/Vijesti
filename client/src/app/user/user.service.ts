import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  username: string;
  role: 'admin' | 'standard';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor() {
    const storedUser = sessionStorage.getItem('currentUser');
    
    let initialUser: User | null = null;
    if (storedUser) {
        try {
            initialUser = JSON.parse(storedUser);
            if (initialUser && initialUser.role !== 'admin' && initialUser.role !== 'standard') {
                initialUser = null; 
            }
        } catch (e) {
            sessionStorage.removeItem('currentUser');
            initialUser = null;
        }
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  setUser(data: { username: string, role: string }): void {
    const role: 'admin' | 'standard' = data.role === 'admin' ? 'admin' : 'standard';
    
    const user: User = {
      username: data.username,
      role: role, 
    };
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  clearUser(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    return this.currentUserValue?.role === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}