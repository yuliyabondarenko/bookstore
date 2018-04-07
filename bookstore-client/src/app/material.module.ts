import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatSidenavModule, MatTableModule,
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
        MatTableModule

    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class MaterialModule {
}
