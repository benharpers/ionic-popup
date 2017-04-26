import { Component, ComponentFactoryResolver, ElementRef, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { Config,
         GestureController, BlockerDelegate, BLOCK_ALL,
         NavParams,
         NavOptions,
         Platform,
         ViewController } from 'ionic-angular';

import { ModuleLoader } from 'ionic-angular/util/module-loader';

import { PopupOptions, PopupButton } from './popup-options';

/**
 * @hidden
 */
@Component({
  selector: 'popup',
  template:
    '<ion-backdrop (click)="bdClick()" [class.backdrop-no-tappable]="!d.enableBackdropDismiss"></ion-backdrop>' +
    '<div class="popup-wrapper">' +
      '<div class="popup-head" *ngIf="d.title || d.subTitle">' +
        '<h2 id="{{hdrId}}" class="popup-title" *ngIf="d.title" [innerHTML]="d.title"></h2>' +
        '<h3 id="{{subHdrId}}" class="popup-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>' +
      '</div>' +
      '<div #viewport nav-viewport></div>' +
      '<div class="popup-button-group" [ngClass]="{\'popup-button-group-vertical\':d.buttons.length>2}">' +
        '<button ion-button="popup-button" *ngFor="let b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass" [color]="b.color" [solid]="b.solid">' +
          '{{b.text}}' +
        '</button>' +
      '</div>' +
    '</div>',
  host: {
    'role': 'dialog',
    '[attr.aria-labelledby]': 'hdrId',
    '[attr.aria-describedby]': 'descId'
  },
  encapsulation: ViewEncapsulation.None,
})
export class PopupCmp {

  @ViewChild('viewport', { read: ViewContainerRef }) viewport: ViewContainerRef;

  activeId: string;
  d: PopupOptions;
  enabled: boolean;
  hdrId: string;
  id: number;
  subHdrId: string;
  mode: string;
  gestureBlocker: BlockerDelegate;

  constructor(
    public cfr: ComponentFactoryResolver,
    public viewCtrl: ViewController,
    public elementRef: ElementRef,
    config: Config,
    gestureCtrl: GestureController,
    params: NavParams,
    private renderer: Renderer,
    private plt: Platform,
    public moduleLoader: ModuleLoader
  ) {

    // gesture blocker is used to disable gestures dynamically
    this.gestureBlocker = gestureCtrl.createBlocker(BLOCK_ALL);
    this.d = params.data;

    this.d.buttons = this.d.buttons.map(button => {
      if (typeof button === 'string') {
        return { text: button };
      }
      return button;
    });

    this.mode = this.d.mode || config.get('mode');
    renderer.setElementClass(elementRef.nativeElement, `popup-${this.mode}`, true);

    if (this.d.cssClass) {
      this.d.cssClass.split(' ').forEach(cssClass => {
        // Make sure the class isn't whitespace, otherwise it throws exceptions
        if (cssClass.trim() !== '') renderer.setElementClass(elementRef.nativeElement, cssClass, true);
      });
    }

    if (this.d.hasInputs && this.plt.is('mobile')) {
      // this alert has a text input and it's on a mobile device so we should align
      // the alert up high because we need to leave space for the virtual keboard
      // this also helps prevent the layout getting all messed up from
      // the browser trying to scroll the input into a safe area
      renderer.setElementClass(elementRef.nativeElement, 'popup-top', true);
    }

    this.id = (++popupIds);
    this.hdrId = 'popup-hdr-' + this.id;
    this.subHdrId = 'popup-subhdr-' + this.id;
    this.activeId = '';
  }

  ionViewPreLoad() {
    const component = this.d.component;
    if (!component) {
      console.warn('modal\'s page was not defined');
      return;
    }

    let cfr = this.moduleLoader.getComponentFactoryResolver(component);
    if (!cfr) {
      cfr = this.cfr;
    }
    const componentFactory = cfr.resolveComponentFactory(component);

    // ******** DOM WRITE ****************
    const componentRef = this.viewport.createComponent(componentFactory, this.viewport.length, this.viewport.parentInjector, []);

    // Change the viewcontroller's instance to point the user provided page
    // Lifecycle events will be sent to the new instance, instead of the modal's component
    // we need to manually subscribe to them
    this.viewCtrl._setInstance(componentRef.instance);
    this.viewCtrl.willEnter.subscribe(this._viewWillEnter.bind(this));
    this.viewCtrl.didLeave.subscribe(this._viewDidLeave.bind(this));

    this.enabled = true;
  }

  ionViewDidEnter() {

    this.enabled = true;
  }

  _viewWillEnter() {
    this.gestureBlocker.block();
  }

  _viewDidLeave() {
    this.gestureBlocker.unblock();
  }

  btnClick(button: any) {
    if (!this.enabled) {
      return;
    }

    this.dismiss(button.role);
  }

  bdClick() {
    if (this.enabled && this.d.enableBackdropDismiss) {
      var cancelBtn = this.d.buttons.find(b => (<PopupButton>b).role === 'cancel');
      if (cancelBtn) {
        this.btnClick(cancelBtn);

      } else {
        this.dismiss('backdrop');
      }
    }
  }

  dismiss(role: any): Promise<any> {
    const opts: NavOptions = {
      minClickBlockDuration: 400
    };
    return this.viewCtrl.dismiss({ /* some data */ }, role, opts);
  }

  ngOnDestroy() {
    if (this.gestureBlocker.blocked === false) console.error('gesture blocker must be already unblocked');
    this.gestureBlocker.destroy();
  }
}

let popupIds = -1;
