import { ReactNode } from 'react';

export type BoxPropsType = {
  title: string;
  uniqueName: string;
  children: ReactNode;
  isExpandedByDefault?: boolean;
  className?: string;
};
