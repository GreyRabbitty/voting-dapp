import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VotingService } from '../services/votingService';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  citizen: any = {
    name: '',
    surname: '',
    idNumber: '',
    city: '',
    postalCode: '',
  };

  constructor(private router: Router, private votingService: VotingService) {}
  ngOnInit(): void {
    const authToken = localStorage.getItem('authToken');
    this.getCitizen(authToken);
  }

  // get authtoken in the localstorage and send it to the backend
  getCitizen(token: string | null) {
    // get authtoken frm the localstorage

    this.votingService.getCitizen(token!).subscribe(
      (data) => {
        this.citizen.name = data.name;
        this.citizen.surname = data.surname;
        this.citizen.idNumber = data.citizenshipId;
        this.citizen.city = data.city;
        this.citizen.postalCode = data.zipCode;
      },
      (error) => {
        // remove the authtoken from the localstorage and navigate to the main page
        console.log(error);
        // localStorage.removeItem('authtoken');
        // alert('Oturumunuz sona ermiştir. Lütfen tekrar giriş yapınız.');
        // this.router.navigate(['/']);
      }
    );
  }

  verifyVoting() {
    // Logic here
    // // this.votingService.verifyVoting().subscribe(

    // if its true
    this.router.navigate(['/stepvote']);
  }
  cancelVoting() {
    // logic here
    // // this.votingService.cancelVoting().subscribe(

    alert('Oylamanız isteğiniz üzerine iptal edilmiştir.');
    this.router.navigate(['/']);
  }
}
