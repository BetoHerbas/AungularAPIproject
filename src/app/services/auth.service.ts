import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor() {}

  async login(username: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${this.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async signUp(user: { name: string; password: string; admin: number }): Promise<any> {
    const userExists = await this.userExists(user.name);

    if (userExists) {
      throw new Error('Username already exists');
    }

    try {
      const response = await fetch(`${this.apiUrl}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }

      return await response.json();
    } catch (error) {
      console.error('Error during sign up', error);
      throw error;
    }
  }

  async userExists(name: string): Promise<boolean> {
    const response = await fetch(`${this.apiUrl}/users/${name}`);
    const users = await response.json();
    return users.length > 0;
  }

}
