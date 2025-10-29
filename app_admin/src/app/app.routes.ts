import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Quote } from './quote/quote';


 export const routes: Routes = [
    { path : '', component: Home}, //deafault route
    { path: 'quote', component: Quote} // Quote page
 ];

 