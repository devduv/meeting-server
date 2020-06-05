import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoomComponent } from './room/room.component';
import { LobbyComponent } from './lobby/lobby.component';
import { DontAccessComponent } from './dont-access/dont-access.component';

const routes: Routes = [
  {path: 'lobby', component: LobbyComponent},
  {path: 'no-access', component: DontAccessComponent},
  {path: ':token', component: RoomComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'no-access'}
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
