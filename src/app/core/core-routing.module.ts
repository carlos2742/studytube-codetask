import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '', redirectTo: '/users', pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('../features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'learnings',
    loadChildren: () => import('../features/learning/learning.module').then(m => m.LearningModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
