import { Component, OnInit, Input } from '@angular/core';
import { CarouselItem } from 'src/app/models/interfaces.class';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() data: CarouselItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
