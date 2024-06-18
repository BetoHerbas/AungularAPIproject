import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateAdminDialogComponent } from './elements/create-admin-dialog/create-admin-dialog.component';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, MatSidenavModule, MatToolbarModule, MatListModule, CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularAPIproject';
  showHeader: boolean = true;
  isAdmin: number = 0;

  constructor(private router: Router, private dialog: MatDialog, private authService: AuthService, private _snackBar: MatSnackBar) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const hideHeaderRoutes = ['/login', '/signup'];
        this.showHeader = !hideHeaderRoutes.includes(event.url);
      }
      this.isAdmin = Number(localStorage.getItem('admin'));
    });
  }
  onAddAdmin() {
    const dialogRef = this.dialog.open(CreateAdminDialogComponent);
    dialogRef.afterClosed().subscribe(async (newAdmin: any) => {
      if (newAdmin) {
        try {
          const response = await this.authService.signUp(newAdmin);
          console.log('User registered successfully', response);
          this.showSnackBar('User registered successfully');
        } catch (error) {
          console.error('Error registering user', error);
          this.showSnackBar('Error: Username already exists. Please try again.');
        }
      }
    });
  }
  showSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
}
