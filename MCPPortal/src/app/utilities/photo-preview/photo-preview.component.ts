import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AttachmentService} from '../../_services';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss']
})
export class PhotoPreviewComponent implements AfterViewInit, OnInit {
  @ViewChild('myCarousel') myCarousel: ElementRef;
  @ViewChild('carouselThumbs') carouselThumbs: ElementRef;
  public dialogOpened = false;
  public data: string[] = [];
  private assignmentId: string;

  constructor(
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private attachmentService: AttachmentService
  ) {
  }

  /**
   * Lifecycle hook called after the view has been initialized.
   */
  ngAfterViewInit(): void {
    this.initCarousel();
  }

  /**
   * Closes the specified component.
   * @param component - Component name to close
   */
  public close(component: string): void {
    this[component + 'Opened'] = false;
  }

  /**
   * Opens the specified component.
   * @param component - Component name to open
   */
  public open(component: string): void {
    this[component + 'Opened'] = true;
  }

  /**
   * Handles the action event from the dialog.
   * @param status - Action status
   */
  public action(status: string): void {
    console.log(`Dialog result: ${status}`);
    this.dialogOpened = false;
  }

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.attachmentService.getPhotos(this.assignmentId)
      .subscribe(files => this.data = files);
    console.log(this.data);
  }

  /**
   * Initializes the carousel and applies customizations.
   */
  private initCarousel(): void {
    const myCarousel = this.myCarousel.nativeElement;
    const carouselThumbs = this.carouselThumbs.nativeElement;

    this.renderer.setProperty(myCarousel, 'interval', false);
    this.renderer.setProperty(carouselThumbs, 'interval', false);

    document.querySelectorAll('[id^=carousel-selector-]').forEach(item => {
      this.renderer.listen(item, 'click', () => {
        const idSelector = item.getAttribute('id');
        // tslint:disable-next-line:radix
        const id = parseInt(idSelector.substr(idSelector.lastIndexOf('-') + 1));
        this.renderer.setProperty(myCarousel, 'slideTo', id);
      });
    });

    if (window.innerWidth < 575) {
      document.querySelectorAll('#carousel-thumbs .row div:nth-child(4)').forEach(item => {
        const rowBoundary = item;
        const newRow = this.renderer.createElement('div');
        this.renderer.addClass(newRow, 'row');
        this.renderer.addClass(newRow, 'mx-0');
        this.renderer.appendChild(newRow, rowBoundary.nextElementSibling);
        this.renderer.appendChild(newRow, rowBoundary.nextElementSibling.nextElementSibling);
        this.renderer.insertBefore(item.parentNode, newRow, rowBoundary.parentNode.nextSibling);
      });
      document.querySelectorAll('#carousel-thumbs .carousel-item .row:nth-child(even)').forEach(item => {
        const boundary = item;
        const newCarouselItem = this.renderer.createElement('div');
        this.renderer.addClass(newCarouselItem, 'carousel-item');
        this.renderer.appendChild(newCarouselItem, boundary);
        this.renderer.appendChild(newCarouselItem, boundary.nextElementSibling);
        this.renderer.insertBefore(boundary.parentNode, newCarouselItem, boundary.parentNode.nextSibling);
      });
    }
  }
}
