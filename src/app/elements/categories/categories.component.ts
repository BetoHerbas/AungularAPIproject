import { Component, Input } from '@angular/core';
import { Categories } from '../../interfaces/categories';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() categories!: Categories;
}
