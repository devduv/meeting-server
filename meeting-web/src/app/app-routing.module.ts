import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DontAccessComponent } from './dont-access/dont-access.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { StartMeetingComponent } from './pages/start-meeting/start-meeting.component';
import { AccessTokenComponent } from './pages/access-token/access-token.component';
import { MeetingComponent } from './pages/meeting/meeting.component';

const routes: Routes = [
  {path: 'startMeeting/:counterName/:ticket/:typeDocument/:document', component: StartMeetingComponent},
  {path: 'token/:token', component: AccessTokenComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'no-access', component: DontAccessComponent},
  {path: '', component: MeetingComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'lobby'},
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
