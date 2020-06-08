import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './access-token.component.html'
})
export class AccessTokenComponent implements OnInit {

  public loading: boolean;
  private token: string;
  public message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loading = true;
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.token = params.token;
    });
    this.saveToken();
    this.accessMeeting();
  }

  private saveToken() {
    sessionStorage.setItem('token', this.token);
  }

  private accessMeeting() {
    this.router.navigate(['/']);
  }
}
