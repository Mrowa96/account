import React, { useState } from 'react';
import classnames from 'classnames';
import Button from '@/components/Button';
import { BoxPropsType } from './Box.types';
import styles from './Box.scss';

function generateStorageKey(uniqueName: string) {
  return btoa(`box-${uniqueName}`);
}

export default function Box({
  title,
  uniqueName,
  children,
  isExpandedByDefault = true,
  className = undefined,
}: BoxPropsType): JSX.Element | null {
  const storageKey = generateStorageKey(uniqueName);
  const [isExpanded, setIsExpanded] = useState(
    window.localStorage.getItem(storageKey)
      ? !!+(window.localStorage.getItem(storageKey) as string)
      : isExpandedByDefault,
  );

  const toggleButtonClickHandler = (): void => {
    window.localStorage.setItem(storageKey, `${+!isExpanded}`);
    setIsExpanded(!isExpanded);
  };

  return (
    <section data-testid='box' className={classnames(styles.Box, className, { [styles.Expanded]: isExpanded })}>
      <header className={styles.Header}>
        <h2 className={styles.Title}>{title}</h2>
        <Button
          className={styles.ToggleButton}
          onClick={toggleButtonClickHandler}
          icon='arrow-down'
          aria-label={isExpanded ? 'Shrink' : 'Expand'}
        />
      </header>
      {isExpanded && (
        <article data-testid='content' className={styles.Content}>
          {children}
        </article>
      )}
    </section>
  );
}
