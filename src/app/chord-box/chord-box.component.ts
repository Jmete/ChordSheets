import { Component, OnInit } from '@angular/core';
import { Chord , ChordRow} from './services/chords';
import { AutofocusDirective } from './directives/autofocus';

import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operator/map';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from './services/http-service'

// Some Chord choices to help the user quickly explore and add chords.
const NOTES: string[] = ['C','C#','Db','D','D#','Eb','E','F','F#','Gb','G','G#','Ab','A','A#','Bb','B'];
const CHORDTYPES: string[] = ['','aug','m','dim','sus','sus2','sus4','7','7b5','7b9','M7','dim7','dimM7','min7','m7b5','mM7','augM7','9','m9','6/9','add9','add2','11','aug11','9aug11','9+11','9alt11','m9(11)','13','m13','M13'];

function ChordGen(N: string[],CT: string[]){
  // Generate most chord types
  let C:string[] = [];
  for(let i =0; i < N.length; i++){
    for(let j=0; j < CT.length; j++){
      C.push(N[i]+CT[j]);
    }
  }

  return C;
}

const CHORDS:string[] = ChordGen(NOTES,CHORDTYPES);

//Jquery
declare var $:any;

@Component({
  selector: 'app-chord-box',
  templateUrl: './chord-box.component.html',
  styleUrls: ['./chord-box.component.css'],
  // FOR FUTURE HTTP TESTING
  providers:[HttpService],
})
export class ChordBoxComponent implements OnInit {

  // Bootstrap 4 autocomplete for chords
  model: String;

  search = (text$: Observable<string>) =>
    map.call(distinctUntilChanged.call(debounceTime.call(text$, 300)),
      term => term.length < 1 ? [] : CHORDS.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

 // Main app

  hobbies: ChordRow[];
  blankRow: Chord[];

  tempTitle: String;
  minutes:number;
  seconds:number;
  bpm:number;
  totalRows:number;
  barSecs:number;

  checkTEST: boolean;



  constructor() {


  }

  ngOnInit() {

    // Initialize app from local storage if available, if not then use default values.

      if (localStorage.getItem("bpm")){
        this.bpm = parseInt(localStorage.getItem("bpm"));
      }else{
        this.bpm = 120;
      }

      if (localStorage.getItem("songLenMin")){
        this.minutes = parseInt(localStorage.getItem("songLenMin"));
      }else{
        this.minutes = 0;
      }

      if (localStorage.getItem("songLenSec")){
        this.seconds = parseInt(localStorage.getItem("songLenSec"));
      }else{
        this.seconds = 30;
      }

      if (localStorage.getItem("hobbies")){
        this.hobbies = JSON.parse(localStorage.getItem("hobbies"));
      }else{
        this.hobbies=[new ChordRow([new Chord('-'),new Chord('-'),new Chord('-'),new Chord('-')],'Example Bar. Click on elements to edit.')];
      }

  }

  // TESTING GET AND POST

  // getTIME(){
  //   this._httpService.getCurrentTime().subscribe(
  //       data => this.getData = JSON.stringify(data),
  //       error => alert(error),
  //       () => console.log('Finished')
  //     );
  // }

  // stringHobbies(){
  //   this.postData = JSON.stringify(this.hobbies);

  // }

  // parseHobbies(){
  //   this.hobbies = JSON.parse(this.postData);
  //   console.log(this.hobbies);
  // }

  // Code for future time sig customization.
  // convertTimeSig(timeSig:string){
  //   let timeValues = timeSig.split("/");
  //   let n;
  //   for(n in timeValues){
  //     n = Number(n);
  //   }
  //   return timeValues;
  // }

// Control Bar Functions

  saveRows(){
    // Saves info from app to local storage.
    localStorage.setItem('bpm', String(this.bpm));
    localStorage.setItem('hobbies', JSON.stringify(this.hobbies));
    localStorage.setItem('songLenMin', String(this.minutes));
    localStorage.setItem('songLenSec', String(this.seconds));
  }

  getMinutes(){
    // Validates minute input, sets to 0 if empty.
    if (typeof this.minutes ==='number' && (this.minutes %1 )===0){
        return ;
      }
    else{
      this.minutes = 0;
    }
  }
  getSeconds(){
    // Validates seconds input, sets to 0 if empty.
    if (typeof this.seconds==='number' && (this.seconds%1)===0){
        return ;
      }
    else{
      this.seconds = 0;
    }
  }

  calcRows(m,s,b){
    // Gets total minutes from min + second conversion, then calculates rows needed.
    let mins:number = +m + +(s / 60);
    let nRows:number = Math.ceil((mins*b) / 4);
    return nRows;

  }

  initRows(){
    // Initalizes rows according to the BPM and Song Length
    this.getMinutes();
    this.getSeconds();
    if (typeof this.bpm==='number' && (this.bpm%1)===0){
      this.hobbies = [];
      let nRows:number = this.calcRows(this.minutes,this.seconds,this.bpm);
      let i = 0;
      while (i < nRows){
        this.newRow();
        i++;
      }

    }
    else{
      alert("Please enter a positive integer for BPM");
    }
  }

  barTime(bars:number){
    // Calculates how long each bar takes to complete in seconds.
    let minToSec:number = this.minutes*60;
    let totalSec:number = minToSec + this.seconds;
    return totalSec / bars;
  }



  jTest(){
    // Animates a scroll bar at the correct speed to play along in sequence.
    this.playRows();
    let bSec = this.barSecs;
    console.log(bSec);

    $(".progressbar").css('-webkit-transition', 'width 0s linear');
    $(".progressbar").css('transition', 'width 0s linear');
    $(".progressbar").css('width', '0%');

    $(".progressbar").each(function(i,el) {

      var $this = $(this);


      setTimeout(function() {

              $this[0].scrollIntoView(true);
              $this.animate( {width: '100%'}, (bSec*1000))

          }, i*(bSec*1000)); // milliseconds
  });


  }

  playRows () {
    // Validates info and updates the number of rows and how long each bar lasts.
    this.getMinutes();
    this.getSeconds();
    if (typeof this.bpm==='number' && (this.bpm%1)===0){
      let nRows:number = this.calcRows(this.minutes,this.seconds,this.bpm);
      this.totalRows = nRows;
      this.barSecs = this.barTime(nRows);


    }
    else{
      alert("Please enter a positive integer for BPM");
    }
  }


  newRow(){
    // Pushes a new row or bar to the main array.
        this.hobbies.push(new ChordRow([new Chord('-'),new Chord('-'),new Chord('-'),new Chord('-')],'-'));

    }

 // Main Sheet Functions

  removeRow(row:ChordRow){
    // Removes the parent Row
      let index:number = this.hobbies.indexOf(row);
      this.hobbies.splice(index,1);
  }


    cancelEditingh(todo: Chord) {
      // Cancel editing of the box without making any changes.
        todo.editing = false;
    }

    blurTEST(todo: Chord, editedTitle: string){
      // Make no change if user clicks outside the box, but allow for autocomplete clicking.
      setTimeout(()=>{
        todo.editing = false;
        console.log(this.checkTEST);
      },300);
    }



    itemSelected($event, todo: Chord) {
      // Tracks if user selects from dropdown autocomplete and inputs before blur.
      this.checkTEST = false;
      todo.editing = false;
      todo.title = $event.item;
    }

    updateEditingh(todo: Chord, editedTitle: string) {
      // Updates the beat / box.
        editedTitle = editedTitle.trim();
        todo.editing = false;

        if (editedTitle.length === 0) {
            editedTitle = '-';
        }

        todo.title = editedTitle;

    }

    edith(todo: Chord) {
      // Activates the editing input.
        this.model = '';
        this.checkTEST = true;
        todo.editing = true;
    }

    // LYRICS ROW FUNCTIONS

    cancelEditingLyrics(todo: ChordRow) {
      // Cancels editing for the lyric box without making any changes.
        todo.editing = false;
    }

    updateEditingLyrics(todo: ChordRow, editedTitle: string) {
      // Updates lyrics box with new words.
        editedTitle = editedTitle;
        todo.editing = false;

        if (editedTitle.length === 0) {
            editedTitle = '-';
        }

        todo.lyrics = editedTitle;

    }

    editLyrics(todo: ChordRow) {
      // Activates the lyric editing input.
        todo.editing = true;
    }


}


