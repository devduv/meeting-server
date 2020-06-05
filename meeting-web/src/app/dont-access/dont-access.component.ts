import { Component, OnInit } from '@angular/core';
import { Meeting } from '../lib/Meeting';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dont-access',
  templateUrl: './dont-access.component.html'
})
export class DontAccessComponent implements OnInit {

  public token: string;
  private error: string;
  public message: string;
  constructor(
    private meeting: Meeting,
    private router: Router
  ) {
    this.meeting.meetingFinished = true;
  }

  ngOnInit() {
    this.token = '';
    this.error = sessionStorage.getItem('no-access');
    console.log(this.error);
    console.log(this.error);
    this.getError();
  }


  private getError() {
    if (this.error === 'Access Token expired or expiration date invalid') {
      this.message = 'Token de acceso vencido';
    } else if (this.error === 'Invalid Access Token') {
      this.message = 'Token de acceso inválido';
    } else if (this.error === null) {
      this.message = 'No ha ingresado ninguna clave de acceso';
    } else {
      this.message = 'Token de acceso inválido';
    }
    sessionStorage.clear();
  }

  public acceder() {
    if (this.token.trim() !== '') {
      this.router.navigate([this.token]);
    }
  }
}
