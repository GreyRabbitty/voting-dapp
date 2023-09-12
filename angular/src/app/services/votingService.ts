import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  private apiUrl = 'http://localhost:3000'; // API Endpoint

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
        })
      );
  }

  getCitizen(token: string) {
    // make post request based on bearer token in the header
    return this.http
      .post(
        `${this.apiUrl}/cdata/getc`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        tap((response: any) => {
          return response.data;
        })
      );
  }
}
