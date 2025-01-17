import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private data = {};

  setOption(option, value) {
    this.data[option] = value;
  }

  getOption() {
    return this.data;
  }
}
