import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { Citizen } from '../model/citizen.model';
// import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
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
      .post(`${this.apiUrl}/cdata/checkc`, {
        name,
        surname,
        citizenshipId: idNumber,
        secret,
      })
      .pipe(
        tap((response: any) => {
          const token = response.token;
          localStorage.setItem('authToken', token);
          this.router.navigate(['/stepverifyc']);
        })
      );
  }
}
