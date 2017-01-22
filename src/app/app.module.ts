import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Numeral } from 'numbertowords/numeral.js';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './cnp-add/cnp-add.component';
import { NumbersComponent } from './numbers/numbers.component';
import { ListComponent } from './cnp-list/cnp-list.component';
import { InventaryobjectsComponent } from './inventaryobjects/inventaryobjects.component';
import { InventarylistComponent } from './inventarylist/inventarylist.component';
import { SalaryComponent } from './salary/salary.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'numbers', component: NumbersComponent },
  { path: 'list', component: ListComponent },
  { path: 'add/:id', component: AddComponent },
  { path: 'inventaryobjects/:id', component: InventaryobjectsComponent },
  { path: 'inventarylist', component: InventarylistComponent },
  {path: 'salary', component:SalaryComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddComponent,
    NumbersComponent,
    ListComponent,
    InventaryobjectsComponent,
  	InventarylistComponent,
    SalaryComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
