import { Animation, Transition } from 'ionic-angular';


/**
 * Animations for popups
 */
export class PopupPopIn extends Transition {
  init() {
    const ele = this.enteringView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    backdrop.fromTo('opacity', 0.01, 0.3);
alert('test');
    this
      .easing('ease-in-out')
      .duration(200)
      .add(backdrop)
      .add(wrapper);
  }
}


export class PopupPopOut extends Transition {
  init() {
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    backdrop.fromTo('opacity', 0.3, 0);

    this
      .easing('ease-in-out')
      .duration(200)
      .add(backdrop)
      .add(wrapper);
  }
}


export class PopupMdPopIn extends Transition {
  init() {
    const ele = this.enteringView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
    backdrop.fromTo('opacity', 0.01, 0.5);

    this
      .easing('ease-in-out')
      .duration(200)
      .add(backdrop)
      .add(wrapper);
  }
}


export class PopupMdPopOut extends Transition {
  init() {
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
    backdrop.fromTo('opacity', 0.5, 0);

    this
      .easing('ease-in-out')
      .duration(200)
      .add(backdrop)
      .add(wrapper);
  }
}


export class PopupWpPopIn extends Transition {
  init() {
    const ele = this.enteringView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.3, 1);
    backdrop.fromTo('opacity', 0.01, 0.5);

    this
      .easing('cubic-bezier(0,0,0.05,1)')
      .duration(200)
      .add(backdrop)
      .add(wrapper);
  }
}


export class PopupWpPopOut extends Transition {
  init() {
    const ele = this.leavingView.pageRef().nativeElement;
    const backdrop = new Animation(this.plt, ele.querySelector('ion-backdrop'));
    const wrapper = new Animation(this.plt, ele.querySelector('.popup-wrapper'));

    wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 1.3);
    backdrop.fromTo('opacity', 0.5, 0);

    this
      .easing('ease-out')
      .duration(150)
      .add(backdrop)
      .add(wrapper);
  }
}
