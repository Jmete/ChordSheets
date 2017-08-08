import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Chord Sheets';
  info:boolean = true;
  iTitle:string = 'Info';

  // Opens or Closes Info component & Switches Info Button to Close Info and back
  switch(){
      this.info = !this.info;
      if(this.info == true){
          this.iTitle = 'Info';
      }else{
          this.iTitle = 'Close Info';
      }
  }
}
