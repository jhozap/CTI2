import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'src/app/models/interfaces.class';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ComponentsService } from 'src/app/services/components.service';
import { User } from 'src/app/models/user.class';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent implements OnInit {
  items: MenuItem[] = [];
  panels: MatExpansionPanel[] = [];
  usr: User
  perfilDenied: number;

  constructor(private componentService: ComponentsService) { }

  ngOnInit(): void {
    this.usr = JSON.parse(atob(sessionStorage.getItem("user")));
    this.perfilDenied = this.usr.PERFIL;
    debugger;
    this.items = this.componentService.menuItems.value;
  }

  getPanel(panel) {
    if (panel !== undefined) {
      this.panels.push(panel);
    }
  }

  closePanels(openPanel) {
    this.panels.forEach(panel => {
      if (panel.id !== openPanel) {
        panel.close();
      }
    });
  }

  closeDrawer() {
    this.componentService.toggleMainMenu.next(false);
  }

}
