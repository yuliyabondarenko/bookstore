import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatSidenavModule,
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
    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatDividerModule,
        MatButtonModule,
    ]
})
export class MaterialModule {
}
