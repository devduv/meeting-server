import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Meeting {

    public localParticipant: any;
    public identity: string;
    public room: any;
    public connected: boolean;
    public waiting: boolean;
    public roomName: string;
    public meetingFinished: boolean;
    constructor() {
    }

    initMeeting() {
        this.connected = false;
        this.waiting = true;
        this.meetingFinished = true;
        this.identity = '';
    }
}
