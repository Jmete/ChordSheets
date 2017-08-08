export class Chord {
    // Creates a Chord object.
    completed: Boolean;
    editing: Boolean;

    title: String;

    // private _title: String;
    // get title() {
    //     return this._title;
    // }
    // set title(value: String) {
    //     this._title = value.trim();
    // }

    constructor(title: String) {
        this.completed = false;
        this.editing = false;
        this.title = title.trim();
    }
}

export class ChordRow {
    // Creates a Chord Row Object which consists of Chord objects.
    completed: Boolean;
    editing: Boolean;


    title: Chord[];
    lyrics: String;

    // private _title: Chord[];
    // get title() {
    //     return this._title;
    // }
    // set title(value: Chord[]) {
    //     this._title = value;
    // }
    // private _lyrics: String;
    // get lyrics() {
    //     return this._lyrics;
    // }
    // set lyrics(value: String) {
    //     this._lyrics = value;
    // }

    constructor(title: Chord[], lyrics: String) {
        this.completed = false;
        this.editing = false;
        this.title = title;
        this.lyrics = lyrics;

    }
}

