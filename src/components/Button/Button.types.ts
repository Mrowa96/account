import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  icon?: string;
};
