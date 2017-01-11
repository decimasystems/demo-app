import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CnpComponent } from './cnp/cnp.component';
import { NumbersComponent } from './numbers/numbers.component';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'numbers', component: NumbersComponent },
  { path: 'cnp', component: CnpComponent },
  {path: 'list', component: ListComponent},
  {path:'about/:id', component: AboutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CnpComponent,
    NumbersComponent,
    ListComponent,
    AboutComponent,
],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
