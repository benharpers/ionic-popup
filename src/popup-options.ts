
export interface PopupOptions {
  title?: string;
  subTitle?: string;
  cssClass?: string;
  mode?: string;
  component?: any;
  buttons?: (PopupButton|string)[];
  enableBackdropDismiss?: boolean;
}

export interface PopupButton {
  text?: string;
  role?: string;
  cssClass?: string;
  handler?: (value: any) => boolean|void;
};
