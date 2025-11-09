import { Routes } from '@angular/router';
import { Login } from './auth/login/login'; 
import { Register } from './auth/register/register';
import { ChangePassword } from './auth/change-password/change-password';
import { Home } from './home/home'; 
import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { ArticleCreate } from './article/article-create/article-create';
import { Welcome } from './welcome/welcome'; 
import { ArticleEdit } from './article/article-edit/article-edit';
import { AdminGuard, AuthGuard } from './auth/auth.guard'; 

export const routes: Routes = [
  // Preusmjerava na Login ako niste prijavljeni (default)
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  
  // 2. Rute za Autentifikaciju
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'change-password', component: ChangePassword },
  
  // 3. RUTA ZA POČETNU STRANICU DOBRODOŠLICE
  // Koristimo Welcome komponentu
  { path: 'pocetna', component: Welcome, canActivate: [AuthGuard] }, 
  
  // 4. RUTA ZA PRIKAZ SVIH ČLANAKA (Listing)
  { path: 'novosti', component: Home, canActivate: [AuthGuard] },
  
  // 5. RUTA ZA PREUSMJERAVANJE HOME: Logika je da /home vodi na /novosti
  { path: 'home', redirectTo: 'novosti', pathMatch: 'full' }, 
  
  // 6. Admin Rute
  { path: 'admin/requests', component: AdminDashboard, canActivate: [AdminGuard] },
  { path: 'admin/create-article', component: ArticleCreate, canActivate: [AdminGuard] },
  { path: 'admin/edit-article/:id', component: ArticleEdit, canActivate: [AdminGuard] },

  { path: '**', redirectTo: 'login' }, 
];