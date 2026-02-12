import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'inverted';

type ButtonBaseProps = {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButtonProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
    href?: never;
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

const joinClassNames = (...classes: Array<string | undefined>) => classes.filter(Boolean).join(' ');

export function Button(props: ButtonProps) {
  const { variant, className } = props;
  const combinedClassName = joinClassNames(
    styles.button,
    variant ? styles[variant] : undefined,
    className,
  );

  if (props.as === 'a') {
    const { as, ...rest } = props;
    void as;
    return <a className={combinedClassName} {...rest} />;
  }

  const { as, type, ...rest } = props;
  void as;
  return <button className={combinedClassName} type={type ?? 'button'} {...rest} />;
}
