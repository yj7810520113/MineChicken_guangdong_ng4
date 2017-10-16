import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

export const appRoutes=[
  {
    path:'',
    redirectTo:'travel',
    pathMatch:'full'
  },
  {
    path:'eat',
    loadChildren:'./screen/eat/eat-mudule/eat-mudule.module#EatMuduleModule'
  },
  {
    path:'travel',
    loadChildren:'./screen/travel/travel-module/travel-module.module#TravelModuleModule',
  }

];
