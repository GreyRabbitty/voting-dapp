import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voted',
  templateUrl: './voted.component.html',
  styleUrls: ['./voted.component.css'],
})
export class VotedComponent {
  constructor(private router: Router) {}

  returnHomePage() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
