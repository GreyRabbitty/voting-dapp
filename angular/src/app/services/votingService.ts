import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Citizen } from '../model/citizen.model';
// import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // API Endpoint
  // private authToken: string;

  constructor(private http: HttpClient, private router: Router) {}

  startVoting(
    name: string,
    surname: string,
    idNumber: string,
    secret: string
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/cdata/checkc`, { name, surname, idNumber, secret })
      .pipe(
        tap((response: any) => {
          const token = response.token;
          this.cacheToken(token);
          this.convertTokenToUserModel(token);
        })
      );
  }

  // Returns user variables without password
  getUser() {
    const currentToken = localStorage.getItem('authToken')!;

    if (currentToken == null) {
      alert('User is not logged in!');
      this.router.navigate(['/login']);
    }
    return this.convertTokenToUserModel(currentToken)!;
  }

  private cacheToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.authToken = token;
  }

  private convertTokenToUserModel(token: string): void {
    return this.convertTokenToUser(token);
  }

  private convertTokenToUser(token: string): any {
    const decodedToken: any = this.decodeJwtToken(token);
    const user: User = new User(
      decodedToken.user._id,
      decodedToken.user.name,
      decodedToken.user.email,
      decodedToken.user.password,
      decodedToken.user.surname,
      decodedToken.user.roles
    );
    return user;
  }

  // Decode the JWT token
  private decodeJwtToken(token: string): any {
    try {
      const decodedToken = jwt_decode(token);

      return decodedToken;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('authToken') === null ? false : true;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authToken = '';
    this.router.navigate(['/']);
  }

  register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = { name, surname, email, password };

    return this.http
      .post(
        `${this.apiUrl}/user/register`,
        { name, surname, email, password },
        { responseType: 'text' }
      )
      .pipe(
        tap((response: any) => {
          alert('User successfully created!');
          this.router.navigate(['/login']);
        })
      );
  }
}
