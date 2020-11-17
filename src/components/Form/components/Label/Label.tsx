import React from 'react';
import classnames from 'classnames';
import { useI18n } from '@/context/I18nContext';
import { LabelPropsType } from './Label.types';
import styles from './Label.scss';

export default function Label({ children, className, markAsRequired, ...props }: LabelPropsType): JSX.Element {
  const { t } = useI18n();

  return (
    <label data-testid='label' className={classnames(styles.Label, className)} {...props}>
      {children}
      {markAsRequired && (
        <span data-testid='required-mark' className={styles.RequiredMark}>
          ({t('form.label.required')})
        </span>
      )}
    </label>
  );
}
