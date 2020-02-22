import { Component, OnInit, Input } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';
import { REAL_MENU_ITEMS } from 'src/app/constants/menuItems.class';
import { carouselItems } from 'src/app/constants/mockData.class';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @Input() isLogged: any;
  toggle = false;

  constructor(private componentService: ComponentsService) { }

  ngOnInit() {
    this.componentService.menuItems.next(REAL_MENU_ITEMS);
    this.componentService.carouselItems.next(carouselItems);
    this.componentService.toggleMainMenu.subscribe(val => {
      this.toggle = val;
    });
  }

}
