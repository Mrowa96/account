import { HTMLProps } from 'react';

type IconPropsType = HTMLProps<HTMLSpanElement> & {
  name: string;
};

export default IconPropsType;
