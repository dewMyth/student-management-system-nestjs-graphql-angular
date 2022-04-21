import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './students/edit/edit.component';
import { ViewComponent } from './students/view/view.component';
import { UploadComponent } from './upload/upload.component';

const routes: Routes = [
  {
    path: 'upload',
    pathMatch: 'full',
    component: UploadComponent,
  },
  {
    path: 'students',
    pathMatch: 'full',
    component: ViewComponent,
  },
  {
    path: 'edit/:id',
    pathMatch: 'full',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
