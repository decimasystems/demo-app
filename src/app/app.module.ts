import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CnpComponent } from './cnp/cnp.component';
import { NumbersComponent } from './numbers/numbers.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'numbers', component: NumbersComponent },
  { path: 'cnp', component: CnpComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CnpComponent,
    NumbersComponent,

  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
