# ionic-popup
This is a copy of ion-alert from Ionic 2. Use to simply pass a component and display a popup alert.


import { SettingsComponent } from './settings/settings';

this.popCtrl.create(SettingsComponent, {
  title: 'Settings',
  buttons: ['Ok']
}).present();
