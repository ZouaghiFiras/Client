import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.scss']
})
export class PartyComponent implements OnInit {
  @Input() partyInitials: Array<{
    avatar: string;
    name: string;
    position: string;
    address: string;
  }>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
