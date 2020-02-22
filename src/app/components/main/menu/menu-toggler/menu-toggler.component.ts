import { Component, OnInit } from '@angular/core';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-menu-toggler',
  templateUrl: './menu-toggler.component.html',
  styleUrls: ['./menu-toggler.component.scss']
})
export class MenuTogglerComponent implements OnInit {
  
  toggle = false;

  constructor(private componentService: ComponentsService) { }

  ngOnInit(): void {
    this.componentService.toggleMainMenu.subscribe(value => this.toggle = value);
  }

  toggleDrawer() {
    this.toggle = !this.toggle;
    this.componentService.toggleMainMenu.next(this.toggle);
  }

}
