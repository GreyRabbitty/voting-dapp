import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from '../services/votingService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router, private votingService: VotingService) {}

  citizen: any = {
    name: '',
    surname: '',
    idNumber: '',
    secret: '',
  };

  startVoting(name: string, surname: string, idNumber: string, secret: string) {
    this.votingService.startVoting(name, surname, idNumber, secret).subscribe(
      (response) => {
        // Successfuly started, redirect part 2
        console.log('Login successful');
        this.router.navigate(['/stepverifyc']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        alert('Something went wrong!');
        // Display error message or perform other actions upon login failure
      }
    );
  }
}
