import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      this.router.navigate(['/home']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
