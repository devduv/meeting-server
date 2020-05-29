import { Component, OnInit } from '@angular/core';
declare const Twilio: any;
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
  public video: any;
  constructor() {
    this.video = Twilio.Video;
  }

  ngOnInit() {
    this.connect();
  }


  public connect() {
    let token = 'eyJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsInR5cCI6IkpXVCIsImFsZyI6IkhTMjU2In0.eyJpc3MiOiJTS2NkNDc3M2VhNmViN2I3OWY4YTk0YTk5YmZiZGIwZDhkIiwiZXhwIjoxNTkwNzk3MTY5LCJncmFudHMiOnsiaWRlbnRpdHkiOiJEdXZhbiIsInZpZGVvIjp7InJvb20iOiJWMDAxVk5DMSJ9fSwianRpIjoiU0tjZDQ3NzNlYTZlYjdiNzlmOGE5NGE5OWJmYmRiMGQ4ZC0xNTkwNzkzNjAwIiwic3ViIjoiQUM1YTdlOGMzMTE2NTk0MTJiMjNkYzYxMzllNDZhYWNmZSJ9.d-Jny_kSl7Ge7nngup0R6rP3PE_M4uykhxzMGh4D2Aw';
    this.video.connect(token, { name: 'V001VNC1' }).then(room => {
      console.log('Connected to Room "%s"', room.name);

      room.participants.forEach(participantConnected);
      room.on('participantConnected', participantConnected);

      room.on('participantDisconnected', participantDisconnected);
      room.once('disconnected', error => room.participants.forEach(participantDisconnected));
    });

    function participantConnected(participant) {
      console.log('Participant "%s" connected', participant.identity);

      const div = document.createElement('div');
      div.id = participant.sid;
      div.innerText = participant.identity;

      participant.on('trackSubscribed', track => trackSubscribed(div, track));
      participant.on('trackUnsubscribed', trackUnsubscribed);

      participant.tracks.forEach(publication => {
        if (publication.isSubscribed) {
          trackSubscribed(div, publication.track);
        }
      });

      document.body.appendChild(div);
    }

    function participantDisconnected(participant) {
      console.log('Participant "%s" disconnected', participant.identity);
      document.getElementById(participant.sid).remove();
    }

    function trackSubscribed(div, track) {
      div.appendChild(track.attach());
    }

    function trackUnsubscribed(track) {
      track.detach().forEach(element => element.remove());
    }
  }
}
