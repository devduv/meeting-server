import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meeting } from 'src/app/lib/Meeting';
declare const Twilio: any;
@Component({
  selector: 'app-room',
  templateUrl: './meeting.component.html'
})
export class MeetingComponent implements OnInit {

  public attatchs: any[];
  public verifyToken: boolean;
  private token: string;
  public video: any;
  public roomName: any;
  public room: any;
  public microphoneEnabled: boolean;
  public microphoneMessage: string;
  public videoEnabled: boolean;
  public videocamMessage: string;

  public loading: boolean;
  // Participante local
  public localParticipant: any;

  // Participantes conectados al Room excepto el local
  public participantsList: any[];

  constructor(
    private route: ActivatedRoute,
    public meeting: Meeting,
    private router: Router
  ) {
    this.attatchs = [];
    this.video = Twilio.Video;
    this.roomName = 'Cargando sala de reunión...';
    this.loading = true;
    this.verifyToken = true;
    this.participantsList = [];
    this.microphoneEnabled = true;
    this.microphoneMessage = 'Desactivar micrófono';
    this.videocamMessage = 'Desactivar video';
    this.meeting.meetingFinished = false;
    this.videoEnabled = true;
  }

  ngOnInit() {
    this.token = sessionStorage.getItem('token');
    this.connectRoom();
  }


  public connectRoom() {
    this.video.connect(this.token, { video: this.videoEnabled, audio: this.microphoneEnabled, })
    .then(room => {
      // Local conectado
      this.participantLocalConnected(room);

      // Participante externo conectado
      this.participantExternConnected(room);

      // Participante externo desconectado
      this.participantExternDisconnected(room);
    }, error => {
      console.log(error.toString());
      if (error.toString() === 'NotFoundError: Requested device not found') {
        this.videoEnabled = false;
        this.videocamMessage = 'Activar video';
        this.connectRoom();
      } else {
        this.meeting.connected = false;
        this.meeting.meetingFinished = true;
        console.log('asas', this.token);
        if (this.token  === null) {
          this.router.navigate(['lobby']);
        } else {
          sessionStorage.setItem('no-access', error.toString().split('TwilioError: ')[1]);
          this.router.navigate(['no-access']);
        }
       
      }

    });
  }

  private participantLocalConnected(room: any) {
    sessionStorage.setItem('meetingFinished', 'false');
    this.verifyToken = false;
    this.roomName = room.name;
    this.room = room;
    this.meeting.roomName = room.name;
    this.loading = false;
    this.localParticipant = room.localParticipant;
    this.meeting.localParticipant = this.localParticipant;
    this.meeting.room = room;
    this.meeting.connected = true;
    this.meeting.identity = this.meeting.localParticipant.identity;
    sessionStorage.setItem('identity', this.meeting.localParticipant.identity);

    this.meeting.localParticipant.on('trackSubscribed', track => this.trackSubscribed(this.meeting.localParticipant.sid, track));
    this.meeting.localParticipant.on('trackUnsubscribed', trackUnsubscribed);
    this.meeting.localParticipant.tracks.forEach(publication => {
      this.trackSubscribed(this.meeting.localParticipant.sid, publication.track);
    });

    function trackUnsubscribed(track: any) {
      track.detach().forEach(element => element.remove());
    }
  }

  private trackSubscribed(id: string, track: any) {
    const div = document.getElementById('participanteLocalID');
      const video = track.attach();
      video.style.transform = 'scale(-1, 1)';
      //his.attatch.push();
      div.appendChild(video);
  }

  private participantExternConnected(room: any) {
    room.participants.forEach(participant => {
      this.participantConnected(participant);
    });

    room.on('participantConnected', participant => {
      this.participantConnected(participant);
    });
  }

  private participantConnected(participant: any) {
    participant.on('trackSubscribed', track => trackSubscribed(participant.sid, track));
    participant.on('trackUnsubscribed', trackUnsubscribed);
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        trackSubscribed(participant, publication.track);
      }
    });

    this.participantsList.push(participant);
    function trackSubscribed(id: string, track: any) {
      const div = document.getElementById(id);
      div.appendChild(track.attach());
    }

    function trackUnsubscribed(track: any) {
      track.detach().forEach(element => element.remove());
    }
  }

  private participantExternDisconnected(room: any) {
    room.on('participantDisconnected', participant => {
      this.participantDisconnected(participant);
    });
    room.once('disconnected', error => room.participants.forEach(participant => {
      this.participantDisconnected(participant);
    }));
  }

  private participantDisconnected(participant: any) {
    const index = this.participantsList.map(x => {
      return x.Id;
    }).indexOf(participant.sid);
    this.participantsList.splice(index, 1);
  }


  public microphone() {

    this.localParticipant.audioTracks.forEach(audioTrack => {
      this.microphoneEnabled = !this.microphoneEnabled;
      this.microphoneMessage = this.microphoneEnabled ? 'Desactivar micrófono' : 'Activar micrófono';
      !this.microphoneEnabled ? audioTrack.track.disable() : audioTrack.track.enable();
    });
  }

  public videocam() {
    this.localParticipant.videoTracks.forEach((publication) => {
      this.videoEnabled = !this.videoEnabled;
      !this.videoEnabled ? publication.track.disable() : publication.track.enable();
    });
  }

  public exitMeeting() {
    this.localParticipant.tracks.forEach(publication => {
      sessionStorage.setItem('meetingFinished', 'true');
      publication.track.stop();
      const attachedElements = publication.track.detach();
      attachedElements.forEach(element => element.remove());
      this.meeting.connected = false;
      this.meeting.meetingFinished = true;
      this.meeting.localParticipant = null;
      this.meeting.roomName = '';
      this.room.disconnect();
      this.router.navigate(['lobby']);
    });

  }

  public videoParticipant(participant: any) {
    return participant.videoTracks.entries().next().value !== undefined ?
      participant.videoTracks.entries().next().value[1].isTrackEnabled : false;
  }

  public microphoneParticipant(participant: any) {
    return participant.audioTracks.entries().next().value !== undefined ?
      participant.audioTracks.entries().next().value[1].isTrackEnabled : false;
  }
}
