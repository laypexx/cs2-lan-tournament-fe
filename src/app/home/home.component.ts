import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  username = 'dodo';
  
  currentMatch = {
    teamBlue: ['cobe', 'chaschi', 'leo', 'dodo', 'graupi'],
    teamRed: ['enne', 'sascha', 'nicklas', 'carste', 'bob']
  };
}