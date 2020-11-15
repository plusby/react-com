import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes}  from 'react'
import { classNames } from '../../utils'

const ButtonType = {
  'Link': 'link',

}

const ButtonSize = {
  'lg': 'lg',
  'sm': 'sm'
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * ##使用
 * ~~~js
 * import Button from 'react-ui-com'
 * ~~~
 * @param props 
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType,
    disabled,
    className,
    size,
    children,
    href,
    ...restProps
  } = props



  const classes = classNames('btn', className,{
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === ButtonType.Link) && disabled
  })

  if(btnType === ButtonType.Link && href){
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        { children }
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >{children}</button>
    )
  }
}


Button.defaultProps = {
  disabled: false,
  btnType: 'primary'
}

export default Button;
