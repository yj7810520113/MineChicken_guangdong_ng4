import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes=[
  {
    path:'',
    redirectTo:'eat',
    pathMatch:'full'
  },
  {
    path:'eat',
    loadChildren:'./screen/eat/eat-mudule/eat-mudule.module#EatMuduleModule'
  }
];
