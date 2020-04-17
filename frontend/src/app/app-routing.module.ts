import { DetailComponent } from './pages/detail/detail.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'movies', component: HomeComponent },
  { path: 'movies/:id', component: DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
