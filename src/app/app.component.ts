import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Story } from './model/story';
import { GetapiService } from './services/getapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: any;
  storyList: any = [];
  stories: any;
  story: any = [];
  recordsLength!: number;
  storyLength: number = 0;
  storyRes: any;

  constructor(private _getapi: GetapiService) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._getapi.fetchStories().subscribe((items) => {
        this.stories = items;
        this.recordsLength = items.length;
        console.log(this.stories);
        for (let i = 0; i < 10; i++) {
          this.storyRes = this._getapi.fetchItem(this.stories[i]);
          this.storyRes.subscribe((data: any) => {
            this.storyList.push(data);
            console.log("stories"+ i +":"+ this.stories[i]);
          })
        }
        this.story = this.storyList;
        this.storyLength += 10;
        console.log("StoryLength: "+this.storyLength);
      });
  }

  getNextRecords(start: any) {
    for (let i = start; i < start + 10; i++) {
      this.storyRes = this._getapi.fetchItem(this.stories[i]);
      this.storyRes.subscribe(async (data: any) => {
      await this.storyList.push(data);
      })
      console.log("stories"+ i +":"+ this.stories[i]);
    }
    this.storyLength += 10;
    console.log("Load StoryLength: "+this.storyLength);
    this.story = this.story.concat(this.storyList);
    //this.story = [...this.story, ...this.storyList];
  }

  trackByFn(index: any, story:any){
    return story.id;
  }
}