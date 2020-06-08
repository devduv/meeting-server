import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData } from '@angular/common';
import localePe from '@angular/common/locales/es-PE';
import { Meeting } from './lib/Meeting';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { DontAccessComponent } from './dont-access/dont-access.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { EditNameComponent } from './edit-name/edit-name.component';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { StartMeetingComponent } from './pages/start-meeting/start-meeting.component';
import { AccessTokenComponent } from './pages/access-token/access-token.component';
import { MeetingComponent } from './pages/meeting/meeting.component';
registerLocaleData(localePe, 'es');

export function initMeeting(meeting: Meeting) {
  return () => meeting.initMeeting();
}

@NgModule({
  declarations: [
    AppComponent,
    MeetingComponent,
    LobbyComponent,
    DontAccessComponent,
    EditNameComponent,
    StartMeetingComponent,
    AccessTokenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    HttpClientModule
  ],
  entryComponents: [EditNameComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' },
    {
      provide: APP_INITIALIZER,
      useFactory: initMeeting,
      deps: [Meeting],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
