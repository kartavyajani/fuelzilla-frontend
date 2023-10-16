import { Injectable } from '@angular/core';
import { INavbarData } from './sidenav/helper';
import { MatMenuComponent } from './mat-menu/mat-menu.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(data: INavbarData): void {
    this.dialog.open(MatMenuComponent, {
      data: data,
      width: '900px',
      height:'540px' // Pass your data to the dialog component
    });
  }
}