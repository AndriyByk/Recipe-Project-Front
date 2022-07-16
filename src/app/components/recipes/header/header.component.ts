import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  signIn: boolean;

  constructor() { }

  ngOnInit(): void {
    this.signIn = true;
  }

}
