# ChordSheets

Chord Sheets is a web app written in Angular 4 that allows you to create, edit, save, and play along with chord sheets in an interactive manner!

Simply enter in the song length and bpm, then click initialize rows. An empty chord sheet will be created which you can edit and save.

By clicking on the individual beats or lyric section, you can edit them. Press ENTER to save your edit. You can press TAB to insert an autocompleted chord, then press ENTER. Alternatively, you can click on one of the autocomplete choices. Clicking outside the box will cancel the edit.

NOTE: Due to the instant chord search, if you wish to enter a regular major chord then type your note (Example: 'C'), then press SPACE then ENTER to avoid the autocomplete interfering.

NOTE: While the site is built using responsive design, it can still cause some issues at the moment with vertical mobile viewing. Please view horizontally for a better experience.

View the app at: www.jamesmete.com/chords

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

# How This Works

This site is written using Angular 4, Javascript, HTML5, and CSS3

The app is split into two main areas, the controls and the actual music sheet. The bars/rows are created as an array that is dynamically updated via Angular 4, and most of the functions use that to their advantage.

The initialize rows button calculates the amount of bars needed at the specific bpm and song length, and then creates a new sheet array with those.

The add row button simply adds a new row to the sheet by pushing a new ChordRow object to the array.

The play button uses jQuery to loop through the created elements and animate a progress bar to show your progress. The speed of the bar is directly linked to the bpm and number of bars which allows you to keep track of your place in the song accurately.

The save button locally saves all the information supplied to localstorage in the browser. This allows you to keep your work until you write over it!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
