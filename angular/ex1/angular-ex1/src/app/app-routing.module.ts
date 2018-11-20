import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import { ClockComponent } from './clock/clock.component';

const routes: Routes =[
  {
    path: 'clock/:city',
    component: ClockComponent,
  },
  {
    path: '**',
    component: ClockComponent,
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
