# ionic-popup
This is a copy of ion-alert from Ionic 2. Use to simply pass a component and display a popup alert.

### app.module.ts
```ts
import { PopupModule } from '../modules/popup/popup-module';

@NgModule({
  declarations: [],
  imports: [
    IonicModule.forRoot(MyApp),
    PopupModule.forRoot(),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
```
### somepage.ts
```ts
import { SettingsComponent } from './settings/settings';

...

btn_pop_test() {
  this.popCtrl.create(SettingsComponent, {
    title: 'Settings',
    buttons: ['Ok']
  }).present();
}
```
