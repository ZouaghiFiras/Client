import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  public tiles = [{
    role: 'FunctionalManager',
    tiles: ['Contract management', 'New entry', 'Overview', 'Settings']
  }];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  goToTile(tile: string) {
    switch (tile) {
      case 'Contract management':
        this.router.navigate(['/contract']);
        break;
      case 'New entry':
        this.router.navigate(['/new-entry']);
        break;
      case 'Overview':
        this.router.navigate(['/organization']);
        break;
      case 'Settings':
        this.router.navigate(['/settings']);
        break;
      default:
        break;
    }
  }
}
