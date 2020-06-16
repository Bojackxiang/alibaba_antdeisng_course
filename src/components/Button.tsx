import React from "react";
import classNames from "classnames";
import { ButtonSize, ButtonType } from "../Enums/ButtonEnums";

// & React.ButtonHTMLAttributes<HTMLElement>

interface IButton {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

type NativeButtonProps = IButton & React.ButtonHTMLAttributes<HTMLElement>;
type NativeLinkProps = IButton & React.AnchorHTMLAttributes<HTMLElement>;

type ButtonProps = Partial<NativeButtonProps & NativeLinkProps>;

export const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  size,
  btnType,
  children,
  href,
  ...restProps
}) => {
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: disabled,
  });

  if (btnType === ButtonType.Link && href)
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );

  return (
    <button
      className={classes}
      disabled={disabled}
      {...restProps}
      onClick={() => {
        alert("clicked button");
      }}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  btnType: ButtonType.Primary,
  disabled: false,
};
