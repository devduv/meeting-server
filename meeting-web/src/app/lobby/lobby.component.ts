import { Component, OnInit } from '@angular/core';
import { Meeting } from '../lib/Meeting';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html'
})
export class LobbyComponent implements OnInit {

  constructor(
    private meeting: Meeting
  ) {
    this.meeting.meetingFinished = true;
  }

  ngOnInit() {
  }

}
