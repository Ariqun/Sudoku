import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

import iconsByName from '../Icons/iconsByName';
import classes from './Button.module.scss';

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  icon?: keyof typeof iconsByName;
  onClick?: () => void;
}>;

const Button: React.FC<Props> = (props) => {
  const {
    children,
    className,
    disabled,
    icon,
    onClick,
  } = props;

  const iconElem = icon && iconsByName[icon];

  return (
    <button
      className={clsx(classes.component, className)}
      onClick={onClick}
      disabled={disabled}
    >
      {iconElem}
      {children}
    </button>
  );
};

export default Button;
