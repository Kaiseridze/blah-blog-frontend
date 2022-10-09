import { FC } from "react";
import "./Button.scss";
import { IButton } from "../../models";

const Button: FC<IButton> = ({
  children,
  className,
  onClick,
  type,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;
