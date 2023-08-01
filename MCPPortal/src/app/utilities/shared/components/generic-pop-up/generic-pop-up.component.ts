import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-generic-pop-up',
  templateUrl: './generic-pop-up.component.html',
  styleUrls: ['./generic-pop-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GenericPopUpComponent implements OnInit, OnChanges {

  @Input() message = '';
  @Input() showOk = false;
  @Output() closeEvent = new EventEmitter<string>();
  messages = [];
  opened = false;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.messages = this.message.split('\n');
  }


  close(event: string) {
    this.opened = false;
    this.closeEvent.emit(event);
  }

  open() {
    this.opened = true;
    this.cd.detectChanges();
  }

}
