import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { Submenu } from 'src/app/models/interfaces.class';
import { MatExpansionPanel } from '@angular/material';

@Component({
  selector: 'app-main-menu-item',
  templateUrl: './main-menu-item.component.html',
  styleUrls: ['./main-menu-item.component.scss']
})
export class MainMenuItemComponent implements OnInit, AfterViewInit {

  @Input()
  index: number;
  @Input() icon: 'string';
  @Input() title: 'string';
  @Input() width: 'number';
  @Input() heigth: 'number';
  @Input() submenu: Submenu[];
  @Input() link: string;
  @ViewChild(`expansion`, { static: false }) expansion: MatExpansionPanel;

  @Output() expansionPanel = new EventEmitter<MatExpansionPanel>();
  @Output() clicked = new EventEmitter<any>();
  @Output() closeDrawer = new EventEmitter<boolean>();

  close = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.expansionPanel.emit(this.expansion);
  }

  emit() {
    this.clicked.emit(this.expansion !== undefined ? this.expansion.id : null);
  }

  closeDrawerFunc() {
    this.closeDrawer.emit(false);
  }

}
