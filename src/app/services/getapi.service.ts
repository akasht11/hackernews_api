import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Story } from '../model/story';

@Injectable({
  providedIn: 'root'
})

export class GetapiService {
  apiUrl = 'https://hacker-news.firebaseio.com/v0/';
  arr:[] | undefined;
  
  constructor(private _http:HttpClient) { }
  
  fetchStories(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/topstories.json`);
  }

  fetchItem(id: number): Observable<any> {
    return this._http.get(`${this.apiUrl}/item/${id}.json`);
  }

}