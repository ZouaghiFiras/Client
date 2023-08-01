import {Observable, Subject} from 'rxjs';
import {environment} from 'src/environments/environment';

export class SettingsSingletonService {

  static instance: SettingsSingletonService;
  static isCreating = false;
  public environment = environment;
  private message: string;
  private contentHeight: number;
  private contentWidth: number;
  private contentHeightSubject: Subject<number> = new Subject<number>();
  private contentWidthSubject: Subject<number> = new Subject<number>();
  private contentRectSubject: Subject<any> = new Subject<any>();

  constructor() {
    if (!SettingsSingletonService.isCreating) {
      throw new Error('You can\'t call new in Singleton instances! Call SettingsSingletonService.getInstance() instead.');
    }
  }

  static getInstance() {
    if (SettingsSingletonService.instance == null) {
      SettingsSingletonService.isCreating = true;
      SettingsSingletonService.instance = new SettingsSingletonService();
      SettingsSingletonService.isCreating = false;
    }

    return SettingsSingletonService.instance;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getMessage(): string {
    return this.message;
  }

  public setRect(_width: number, _height: number): void {
    console.log('SettingsSingletonService: setRect: (' + _width + ', ' + _height + ')');

    this.contentWidth = _width;
    this.contentHeight = _height;

    this.contentWidthSubject.next(_width);
    this.contentHeightSubject.next(_height);
    this.contentRectSubject.next({_width, _height});
  }

  public getRect(): any {
    console.log('SettingsSingletonService: getHeight');
    const _with = this.contentWidth;
    const _height = this.contentHeight;

    return {_with, _height};
  }

  public setHeight(_height: number): void {
    console.log('SettingsSingletonService: setHeight: ' + _height);

    this.contentHeight = _height;
    this.contentHeightSubject.next(_height);
  }

  public getWidth(): number {
    console.log('SettingsSingletonService: getWidth');

    return this.contentWidth;
  }

  public getHeight(): number {
    console.log('SettingsSingletonService: getHeight');

    return this.contentHeight;
  }

  public getContentHeight(): Observable<number> {
    console.log('SettingsSingletonService: getContentHeight');

    return this.contentHeightSubject.asObservable();
  }

  public getContentRect(): Observable<any> {
    console.log('SettingsSingletonService: getContentRect');

    return this.contentRectSubject.asObservable();
  }

}
