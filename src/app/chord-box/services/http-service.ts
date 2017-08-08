import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService{
    // FOR TESTING FUTURE HTTP FUNCTIONS


    private _url: string = "http://date.jsontest.com"

    constructor(private _http: Http){}

    getCurrentTime(){
        return this._http.get(this._url)
        .map((response:Response) => response.json())
        .catch(error => {
            console.error(error);
            return Observable.throw(error.json())
        });
    }

}

