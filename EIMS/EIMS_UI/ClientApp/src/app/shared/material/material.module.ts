import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatGridListModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MatMenuModule,
  MatTableModule,
  MatCheckboxModule,
  MatStepperModule,
  MatTabsModule,
  MatRadioModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const modules = [
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatGridListModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatOptionModule,
  MatDialogModule,
  MatMenuModule,
  MatTableModule,
  MatCheckboxModule,
  MatStepperModule,
  LayoutModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatRadioModule
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modules
  ],
  exports: [
    CommonModule,
    modules
  ]
})
export class MaterialModule { }
