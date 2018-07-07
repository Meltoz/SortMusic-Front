import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from "./../Constantes/Const"
import { Music } from './../Models/Music';

@Component({
  selector: 'app-list-music',
  templateUrl: './list-music.component.html',
  styleUrls: ['./list-music.component.css']
})

export class ListMusicComponent implements OnInit {

  musicsName:string[];
  selectedMusic: string;
  music: Music;
  options : string[];


  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get<string[]>(API_URL.concat('/music/all')).toPromise().then(data=>
      {
        this.musicsName = data; 
      });
      this.http.get<string[]>(API_URL.concat('/style/all')).toPromise().then(data=>
      {
        this.options = data;
      })
      
  }

  onSelect(musicName: string): void {
    this.selectedMusic = musicName;
    this.appelAPI();
    console.log(this.options);
  }

  appelAPI(){
    this.http.get<Music>(API_URL.concat('/music/byName?title=').concat(this.selectedMusic).concat('.mp3')).toPromise().then(data=>
      {
        this.music = data;
      });
  }

}
