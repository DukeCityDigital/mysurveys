import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  example: string;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as { example: string };
    console.log(state, this.example)
    if (state) {
      this.example = state.example;

    }
  }


  ngOnInit(): void {
  }

}
