import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatPaginatorModule, MatSidenavModule, MatTableModule,
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
    ]
})
export class MaterialModule {
}
