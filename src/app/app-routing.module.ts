import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full' },
    { path: 'overview', component: OverviewComponent },
    { path: 'edit', component: EditComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
