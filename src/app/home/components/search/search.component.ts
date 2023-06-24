import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search = new FormControl()
  result: any[] = []

  constructor(
    private http: HttpClient
  ){}

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      debounceTime(300)
    ).subscribe((value) => this.doSearch(value))
  }

  doSearch(value: string) {
    this.http.get<{data: any[]}>(`https://api.giphy.com/v1/gifs/search?q=${value}&api_key=fRqE7Z6ywo5g4G7H6cM7nhFsyAka2hJw&limit=10`)
      .pipe(
        map((response) => response.data.map((item) => item.images.downsized))
      )
      .subscribe((data) => {
        this.result = data
      })
  }



}
