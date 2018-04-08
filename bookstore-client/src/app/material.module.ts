import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatPaginatorModule,
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
    ]
})
export class MaterialModule {
}
