import { HTMLProps, ReactNode } from 'react';

export type FormPropsType = HTMLProps<HTMLFormElement> & {
  children: ReactNode;
};
