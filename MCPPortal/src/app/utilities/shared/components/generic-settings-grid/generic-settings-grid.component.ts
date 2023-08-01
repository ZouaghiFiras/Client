import {Component, OnInit} from '@angular/core';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';
import {State} from '@progress/kendo-data-query';

@Component({
  selector: 'app-generic-settings-grid',
  templateUrl: './generic-settings-grid.component.html',
  styleUrls: ['./generic-settings-grid.component.scss']
})
export class GenericSettingsGridComponent implements OnInit {
  fieldsList: any[];
  currentPage = 1;
  filters: any;
  clearFilter = false;
  buttonCount;
  gridView: GridDataResult;
  public state: State = {
    skip: 0,
    take: 11,
    filter: {
      logic: 'and',
      filters: [],
    }
  };

  constructor() {
  }

  ngOnInit(): void {
  }


  dataStateChange(state: DataStateChangeEvent) {
    this.filters = state.filter.filters;
    if (state.filter.filters.length > 0) {
      this.state.filter.filters = state.filter.filters;
    } else {
      this.state.filter.filters = [];
    }
  }

  changeDataForGrid(page) {
  }

  pageChange(event): void {
  }

  public clearFilters() {
  }

  open(row: any, msg) {
  }

  getDataByFilters() {
  }

  changeDataForGridFromPager(page) {
  }
}
