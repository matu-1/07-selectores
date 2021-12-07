import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaisRoutingModule } from './pais-routing.module';
import { SelectorComponent } from './pages/selector/selector.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SelectorComponent
  ],
  imports: [
    CommonModule,
    PaisRoutingModule,
    ReactiveFormsModule
  ]
})
export class PaisModule { }
