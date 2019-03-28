import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { MatInputModule }           from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule }          from '@angular/material/button';
import { MatSnackBarModule }        from '@angular/material/snack-bar';
import { MatCardModule }            from '@angular/material/card';
import { MatListModule }            from '@angular/material/list';
import { MatSidenavModule }         from '@angular/material/sidenav';

const materials = [
  MatInputModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatSnackBarModule,
  MatCardModule,
  MatListModule,
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materials
  ],
  exports: materials
})
export class MaterialsModule { }
