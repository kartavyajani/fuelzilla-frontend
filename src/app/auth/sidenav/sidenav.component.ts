import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { MatMenuComponent } from '../mat-menu/mat-menu.component';
import { DialogService } from '../dialog.service';
import { SideNavService } from '../side-nav.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms', 
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
 
  collapsed = false;
  screenWidth = 0;
  navData: INavbarData[] = navbarData;
  multiple: boolean = false;
  isOpening=false;
  navDataNew=navbarData;
  @ViewChild(MatMenuComponent) matMenu!: MatMenuComponent;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router,private dialogService: DialogService,private sideNavService: SideNavService) {
    this.sideNavService.collapsed$.subscribe((collapsed) => {
      this.collapsed = collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    });
  }

  ngOnInit(): void {
      this.screenWidth = window.innerWidth;
  }
  ngAfterViewInit() {
    // ngAfterViewInit is called after the view is initialized
    this.matMenu; // Here, you should be able to access matMenu without it being undefined
  }
  // expandItem(data: INavbarData): void {
  //   console.log("expand data called", data);
  //   if (data.items && data.items.length > 0) {
  //     data.expanded = true;
  //     this.isOpening = true;
  //     if (this.matMenu) {
  //       this.matMenu.openMenu();
  //     }
  //   }
  // }
  
  callMatmenu(data: INavbarData) {
    console.log("call mat xdata", data);
    // this.expandItem(data); 
    this.dialogService.openDialog(data);// Call the expandItem function with the same data
  }
  

  collapseItem(data: INavbarData): void {
    console.log("collapse data called",data);
    
    if (data.items && data.items.length > 0) {
      data.expanded = false;
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  handleClick(item: INavbarData): void {
    console.log("item clicked",item);
    
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
