import { Injectable } from '@angular/core';

import { App, Config } from 'ionic-angular';

import { Popup } from './popup';
import { PopupOptions } from './popup-options';

@Injectable()
export class PopupController {

  constructor(private _app: App, public config: Config) { }

  /**
   * Display a popup with a title, component page, and buttons
   * @param {AlertOptions} opts Alert. See the table below
   */
  create(controller: any, data: any = {}, opts: PopupOptions = {}): Popup {
    return new Popup(this._app, controller, data, opts, this.config);
  }

}
