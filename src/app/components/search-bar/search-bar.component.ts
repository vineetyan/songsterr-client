import { Component, Output , EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Input()  searchText = '';
  constructor() {
  }

  search() {
    this.onSearch.emit(this.searchText);
  }

}
