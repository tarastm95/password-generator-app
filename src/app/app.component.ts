import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment.local';

interface PasswordResponse {
  random_password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'password-generator-app';

  length = 12;
  includeNumbers = true;
  includeSymbols = true;

  password = '';
  loading = false;

  private API_URL = '/api/passwordgenerator';
  private API_KEY = environment.apiKey;

  constructor(private http: HttpClient) {}

  generate(): void {
    this.loading = true;
    this.password = '';

    const params = [
      `length=${this.length}`,
      `numbers=${this.includeNumbers}`,
      `special=${this.includeSymbols}`
    ].join('&');
    const url = `${this.API_URL}?${params}`;
    const headers = new HttpHeaders({ 'X-Api-Key': this.API_KEY });

    this.http
      .get<PasswordResponse>(url, { headers })
      .subscribe({
        next: (res) => {
          this.password = res.random_password;
          this.loading = false;
        },
        error: (err) => {
          alert('Error generating password');
          this.loading = false;
        }
      });
  }

  copy(): void {
    if (!this.password) {
      return;
    }
    navigator.clipboard.writeText(this.password).then(() => {
      alert('Password copied to clipboard!');
    });
  }
}
