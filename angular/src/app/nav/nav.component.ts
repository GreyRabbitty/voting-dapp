import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  votingStarted: boolean = false;
  constructor(private router: Router) {}
  ngOnInit(): void {
    // generate a if that checks its not the home page enable votingStarted
    if (this.router.url === '/' || this.router.url.startsWith('/?')) {
      this.votingStarted = true;
    } else {
      this.votingStarted = false;
    }
  }
}
