import { HTMLProps, ReactNode } from 'react';

export type LabelPropsType = HTMLProps<HTMLLabelElement> & {
  children: ReactNode;
  markAsRequired?: boolean;
};
