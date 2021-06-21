import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { ListUserComponent } from 'src/app/modules/auth/pages/list-user/list-user.component';
import { ProfileComponent } from 'src/app/modules/auth/pages/profile/profile.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'list-user',
                component: ListUserComponent
            },
            {
                path: 'user/edit/:id',
                component: ProfileComponent
            }
        ]
    }
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule ]
})
export class LayoutRoutingModule {

}


