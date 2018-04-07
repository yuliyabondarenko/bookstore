import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatPaginatorModule, MatSidenavModule, MatSortModule,
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
    ]
})
export class MaterialModule {
}
