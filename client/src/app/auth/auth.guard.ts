import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';

// Guard za provjeru da li je korisnik PRIJAVLJEN (Standardni ILI Admin)
export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  
  // LOGOVANJE: Provjera prijavljenog statusa
  console.log("AuthGuard Provjera: Prijavljen =", userService.isLoggedIn()); 

  if (userService.isLoggedIn()) {
    return true; 
  }
  return inject(Router).createUrlTree(['/login']);
};

// Guard za provjeru da li je korisnik prijavljen I da li je administrator
export const AdminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  
  const isLoggedIn = userService.isLoggedIn();
  const isAdmin = userService.isAdmin();

  console.log("AdminGuard Provjera:");
  console.log("  1. Prijavljen:", isLoggedIn);
  console.log("  2. Uloga Admin:", isAdmin);
  console.log("  3. Detalji Uloge:", userService.currentUserValue);


  if (isLoggedIn && isAdmin) {
    return true; 
  }
  
  // Ruter preusmjerava na login ako niste admin
  return router.createUrlTree(['/login']); 
};