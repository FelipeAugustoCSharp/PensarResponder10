import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDataComponent } from './form-data/form-data.component';



@NgModule({
  declarations: [
    FormDataComponent    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [ FormDataComponent]
})
export class ComponentsModule { }
