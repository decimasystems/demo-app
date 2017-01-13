import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Numeral } from 'numbertowords/numeral.js';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes,ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { NumbersComponent } from './numbers/numbers.component';
import { ListComponent } from './list/list.component';
import { IdentityCardComponent } from './identitycard/identitycard.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'numbers', component: NumbersComponent },
  { path: 'identitycard', component: IdentityCardComponent },
  {path: 'list', component: ListComponent},
  {path:'add/:id', component: AddComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddComponent,
    NumbersComponent,
    ListComponent,
    
    IdentityCardComponent,

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
