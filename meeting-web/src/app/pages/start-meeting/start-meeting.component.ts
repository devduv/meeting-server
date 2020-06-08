import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetingService } from 'src/app/services/meeting-service.service';

@Component({
  selector: 'app-start-meeting',
  templateUrl: './start-meeting.component.html'
})
export class StartMeetingComponent implements OnInit {

  public counterName: string;
  public ticket: string;
  public typeDocument: string;
  public document: string;
  public message: string;
  public loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meetingService: MeetingService
  ) { 
    this.loading = true;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.counterName = params.counterName;
      this.ticket = params.ticket;
      this.typeDocument = params.typeDocument;
      this.document = params.document;
    });
    this.startMeeting();
  }

  private startMeeting() {
    const request = this.counterName + '/' + this.ticket + '/' + this.typeDocument + '/' + this.document;
    this.meetingService.startMeeting(request).subscribe(data => {
      this.loading = !this.loading;
      this.router.navigate(['token/' + data.token]);
    }, error => {
      this.loading = !this.loading;
      console.log(error);
      this.message = 'No se pudo crear una reunión';
    });
  }
}
