import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { StatusColorPipe } from './pipes/status-color.pipe';
import { HighlightRowDirective } from './directives/highlight-row.directive';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    StatusColorPipe,
    HighlightRowDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ConfirmDialogComponent,
    StatusColorPipe,
    HighlightRowDirective,
  ]
})
export class SharedModule { }
