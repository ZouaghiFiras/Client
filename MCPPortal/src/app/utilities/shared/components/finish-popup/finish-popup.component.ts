import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-finish-popup',
  templateUrl: './finish-popup.component.html',
  styleUrls: ['./finish-popup.component.scss']
})
export class FinishPopupComponent implements OnInit, OnDestroy {


  /**
   * state of the pop up
   */
  /**
   * message shown in pop up
   */
  @Output() cancelEvent = new EventEmitter();
  @Output() finishNewEvent = new EventEmitter();
  @Output() closePopup: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() saveOrganization: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() message;
  @Input() state;
  @Input() buttonsName;


  constructor(private route: Router) {
  }

  ngOnInit() {

  }

  /**
   * Accept intake time
   */
  accept() {
    this.saveOrganization.emit(true);
  }

  reject() {
    // this.state = 'rejected';
    this.closePopup.emit(false);
  }

  cancel() {
    this.cancelEvent.emit();
  }

  // newIntake() {
  //   this.finishNewEvent.emit();
  //   this.cancel();
  //   this.route.routeReuseStrategy.shouldReuseRoute = function () {
  //     return false;
  //   };
  //   this.mySubscription = this.route.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       // Trick the Router into believing it's last link wasn't previously loaded
  //       this.route.navigated = false;
  //     }
  //   });
  //   this.route.routeReuseStrategy.shouldReuseRoute = function () {
  //     return false;
  //   };
  //   this.route.navigate(['/dossier/create']);


  ngOnDestroy() {

  }

}
