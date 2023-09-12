import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css'],
})
export class VotingComponent {
  candidateInfos: any = [
    {
      id: 'akp',
      name: 'AKP - Adalet ve Kalkınma Parti',
      image: 'assets/images/akp.svg',
    },
    {
      id: 'chp',
      name: 'CHP - Cumhuriyet Halk Partisi',
      image: 'assets/images/chp.svg',
    },
    {
      id: 'iyi',
      name: 'İYİ Parti',
      image: 'assets/images/iyi.svg',
    },
    {
      id: 'mhp',
      name: 'MHP - Milliyetçi Hareket Partisi',
      image: 'assets/images/mhp.svg',
    },
    {
      id: 'hdp',
      name: 'HDP - Halkların Demokratik Partisi',
      image: 'assets/images/hdp.png',
    },
  ];

  constructor(private router: Router) {}

  vote(partyId: string) {
    var ok = true;

    // logic here
    // make request to voting service
    // this.votingService.vote(candidateId).subscribe(

    // return to voting accepted page
    if (ok == true) {
      this.router.navigate(['/votingaccepted']);
    } else {
      this.router.navigate(['/votingdenied']);
    }
  }
}
