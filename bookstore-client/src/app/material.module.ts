import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDialogModule,
  MatDividerModule,
  MatGridListModule, MatInputModule,
  MatListModule,
  MatPaginatorModule, MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';


@NgModule({
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatChipsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,

  ],
  exports: [
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatChipsModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
  ]
})
export class MaterialModule {
}
