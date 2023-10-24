import { Component, Input, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  constructor(private sideNavService: SideNavService) { }

  ngOnInit(): void {
  }
  toggleSideNav() {
    this.sideNavService.toggleCollapse(!this.collapsed);
  }
  getHeadClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenWidth > 768) {
    styleClass = 'head-trimmed';
    } else {
    styleClass = 'head-md-screen';
    }
    return styleClass;
    }

}
