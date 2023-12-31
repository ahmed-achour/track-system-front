import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {

  @Input() open: boolean = false;
  @Input() imageURL: string ="";

  @Output() close = new EventEmitter();

  constructor() { }
}