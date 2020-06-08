import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http: HttpClient) { }

  public startMeeting(request: string) {
    console.log('tokeb');
    return this.http.get<any>('meeting/api/v1/meeting/start/' + request);
  }
}
