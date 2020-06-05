import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Meeting } from './lib/Meeting';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { EditNameComponent } from './edit-name/edit-name.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public date: number;
  public version: string;
  mobile: MediaQueryList;
  mobileListener: () => void;

  ngOnInit() {
  }


  constructor(
    media: MediaMatcher,
    public meeting: Meeting,
    private router: Router,
    public dialog: MatDialog) {
    this.date = Date.now();
    this.mobile = media.matchMedia('(max-width: 500px)');
  }

  public exitMeeting() {
    this.meeting.localParticipant.tracks.forEach(publication => {
      publication.track.stop();
      const attachedElements = publication.track.detach();
      attachedElements.forEach(element => element.remove());
      this.meeting.connected = false;
      this.meeting.meetingFinished = true;
      this.meeting.room.disconnect();
      this.meeting.roomName = '';
      this.meeting.localParticipant = null;
      this.router.navigate(['lobby']);
    });
  }

  public editName() {
    const dialogRef = this.dialog.open(EditNameComponent);

    dialogRef.afterClosed().subscribe(result => {
        this.meeting.identity =
        (result === undefined ? sessionStorage.getItem('identity') : result);
    });
  }

}
