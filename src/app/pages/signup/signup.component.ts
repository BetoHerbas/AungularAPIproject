import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user = {
    name: '',
    password: '',
    admin: 0
  };
  
  constructor(private authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}
  async onSignUp() {
    try {
      const response = await this.authService.signUp(this.user);
      this.showSnackBar('User registered successfully');
      console.log('User registered successfully', response);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error registering user', error);
      this.showSnackBar('Username already exists. Please try again.');
    }
  }
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}
