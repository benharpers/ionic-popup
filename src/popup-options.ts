
export interface PopupOptions {
  title?: string;
  subTitle?: string;
  cssClass?: string;
  mode?: string;
  component?: any;
  data?: object;
  buttons?: (PopupButton|string)[];
  hasInputs?: boolean;
  enableBackdropDismiss?: boolean;
}

export interface PopupButton {
  text?: string;
  role?: string;
  cssClass?: string;
  color?: string;
  solid?: boolean;
  handler?: (value: any) => boolean|void;
};
