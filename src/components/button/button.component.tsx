import { ButtonHTMLAttributes, ReactNode } from 'react';
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  ButtonSpinner,
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

type ButtonProps = {
  children: ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES;
  shouldShowSpinner?: boolean;
  otherAttributes: ButtonHTMLAttributes<HTMLButtonElement>
}

const Button = ({
  children,
  buttonType,
  shouldShowSpinner = false,
  ...otherAttributes
}: ButtonProps) => {
  const CustomButton = getButton(buttonType);

  return (
    <CustomButton {...otherAttributes}>
      {shouldShowSpinner ? <ButtonSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
