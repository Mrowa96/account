import React from 'react';
import classnames from 'classnames';
import Icon from '@/components/Icon';
import { ButtonPropsType } from './Button.types';
import styles from './Button.scss';

export default function Button({
  children,
  type = 'button',
  onClick,
  className,
  icon,
  ...props
}: ButtonPropsType): JSX.Element {
  const wrapChildren = children && icon;

  return (
    <button
      {...props}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classnames(styles.Button, className)}
      onClick={onClick}>
      {icon && <Icon name={icon} className={styles.Icon} />}
      {wrapChildren ? (
        <span data-testid='text' className={styles.Text}>
          {children}
        </span>
      ) : (
        <>{children}</>
      )}
    </button>
  );
}
