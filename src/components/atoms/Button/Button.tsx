import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Icon, type IconName } from '../Icon';
import styles from './Button.module.css';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'whatsapp'
  | 'outline'
  | 'ghost'
  | 'danger';

export type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconLeft?: IconName;
  iconRight?: IconName;
  className?: string;
  children?: ReactNode;
}

type NativeButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ExternalLinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type RouterLinkProps = BaseProps & { as: 'link'; to: string };

export type ButtonProps = NativeButtonProps | ExternalLinkProps | RouterLinkProps;

const buildClassName = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth?: boolean,
  className?: string,
): string =>
  [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

const ICON_SIZE: Record<ButtonSize, number> = { sm: 16, md: 20, lg: 22 };

const Content = ({ iconLeft, iconRight, size = 'md', children }: BaseProps) => (
  <>
    {iconLeft && <Icon name={iconLeft} size={ICON_SIZE[size]} />}
    {children}
    {iconRight && <Icon name={iconRight} size={ICON_SIZE[size]} />}
  </>
);

/**
 * Botón único de la app. Según `as` renderiza `<button>`, un `<a>` externo
 * (wa.me, tel:, mailto:) o un `<Link>` de react-router, con el mismo lenguaje visual.
 */
export const Button = (props: ButtonProps) => {
  const content = (
    <Content iconLeft={props.iconLeft} iconRight={props.iconRight} size={props.size}>
      {props.children}
    </Content>
  );

  if (props.as === 'link') {
    const { as, variant, size, fullWidth, className, iconLeft, iconRight, children, ...rest } =
      props;
    return (
      <Link className={buildClassName(variant, size, fullWidth, className)} {...rest}>
        {content}
      </Link>
    );
  }

  if (props.as === 'a') {
    const { as, variant, size, fullWidth, className, iconLeft, iconRight, children, ...rest } =
      props;
    return (
      <a
        className={buildClassName(variant, size, fullWidth, className)}
        rel="noopener noreferrer"
        {...rest}
      >
        {content}
      </a>
    );
  }

  const {
    as,
    variant,
    size,
    fullWidth,
    className,
    iconLeft,
    iconRight,
    children,
    type = 'button',
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={buildClassName(variant, size, fullWidth, className)}
      {...rest}
    >
      {content}
    </button>
  );
};
