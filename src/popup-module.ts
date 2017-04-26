import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PopupController } from './popup-controller';
import { PopupCmp } from './popup-component';

@NgModule({
  declarations: [
    PopupCmp
  ],
  imports: [
    IonicModule
  ],
  entryComponents: [
    PopupCmp
  ]
})
export class PopupModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PopupModule,
      providers: [
        PopupController
      ]
    };
  }
}
