import { Component, OnInit } from '@angular/core';
import { Meeting } from 'src/app/lib/Meeting';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html'
})
export class LobbyComponent implements OnInit {

  public meetingFinished: string;
  public message: string;
  public value: number;
  public time: number;
  constructor(
    private meeting: Meeting,
    private _location: Location
  ) {
    this.time = 0;
    this.meeting.meetingFinished = true;
  }

  ngOnInit() {
    this.meetingFinished = sessionStorage.getItem('meetingFinished');
    if (this.meetingFinished === 'true') {
      this.time = 10;
      this.value = 100;
      this.discount();
      this.spinner();
      this.message = 'Ha salido de la reunión';
    }
  }


  private discount() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time = this.time - 1;
        this.discount();
      }, 1000);
    } else {
      this.removeStorage();
    }
  }

  private removeStorage() {
    sessionStorage.clear();
  }

  private spinner() {
    if (this.value > 0) {
      setTimeout(() => {
        this.value = this.value - 1;
        this.spinner();
      }, 100);
    }
  }

  public backMeeting() {
    this._location.back();
  }
}
