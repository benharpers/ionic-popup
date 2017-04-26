import { App,
         Config,
         NavOptions,
         ViewController } from 'ionic-angular';

import { PopupPopIn, PopupPopOut, PopupMdPopIn, PopupMdPopOut, PopupWpPopIn, PopupWpPopOut } from './popup-transitions';

import { isPresent } from 'ionic-angular/util/util';

import { PopupOptions, PopupButton } from './popup-options';
import { PopupCmp } from './popup-component';

/**
 * @hidden
 */
export class Popup extends ViewController {
  private _app: App;

  constructor(app: App, component: any, data: any = {}, opts: PopupOptions = {}, config: Config) {
    opts.component = component;
    opts.data = data;
    opts.buttons = opts.buttons || [];
    opts.enableBackdropDismiss = isPresent(opts.enableBackdropDismiss) ? !!opts.enableBackdropDismiss : true;

    super(PopupCmp, opts, null);
    this._app = app;
    this.isOverlay = true;

    config.setTransition('popup-pop-in', PopupPopIn);
    config.setTransition('popup-pop-out', PopupPopOut);
    config.setTransition('popup-md-pop-in', PopupMdPopIn);
    config.setTransition('popup-md-pop-out', PopupMdPopOut);
    config.setTransition('popup-wp-pop-in', PopupWpPopIn);
    config.setTransition('popup-wp-pop-out', PopupWpPopOut);

    config.setModeConfig('ios', { popupEnter: 'popup-pop-in', popupLeave: 'popup-pop-out' });
    config.setModeConfig('md',  { popupEnter: 'popup-md-pop-in', popupLeave: 'popup-md-pop-out' });
    config.setModeConfig('wp',  { popupEnter: 'popup-wp-pop-in', popupLeave: 'popup-wp-pop-out' });
  }

  /**
  * @hidden
  */
  getTransitionName(direction: string): string {
    let key = (direction === 'back' ? 'popupLeave' : 'popupEnter');
    return this._nav && this._nav.config.get(key);
  }

  /**
   * @param {any} component  Popup component
   */
  setComponent(component: any): Popup {
    this.data.component = component;
    return this;
  }

  /**
   * @param {any} button Popup button
   */
  addButton(button: PopupButton|string): Popup {
    this.data.buttons.push(button);
    return this;
  }

  /**
   * @param {string} cssClass Set the CSS class names on the popups's outer wrapper.
   */
  setCssClass(cssClass: string): Popup {
    this.data.cssClass = cssClass;
    return this;
  }

  /**
   * @param {string} mode Set the mode of the popup (ios, md, wp).
   */
  setMode(mode: string) {
    this.data.mode = mode;
  }

  /**
   * Present the popup instance.
   *
   * @param {NavOptions} [opts={}] Nav options to go with this transition.
   * @returns {Promise} Returns a promise which is resolved when the transition has completed.
   */
  present(navOptions: NavOptions = {}): Promise<any> {
    navOptions.minClickBlockDuration = navOptions.minClickBlockDuration || 400;
    return this._app.present(this, navOptions);
  }

}
