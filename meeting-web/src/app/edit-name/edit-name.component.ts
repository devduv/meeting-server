import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-name',
  templateUrl: './edit-name.component.html'
})
export class EditNameComponent implements OnInit {

  public name: string;
  constructor() {
    this.name = '';
  }

  ngOnInit() {
  }

  public save() {
    console.log(this.name);
    sessionStorage.setItem('identity', this.name);
  }

}
