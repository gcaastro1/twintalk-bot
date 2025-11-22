// Types
import type { IButtonProps } from "../../../types/Components";
// Styles
import "./styles.scss";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  fullWidth = false,
  icon = false,
}: IButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        btn
        btn--${variant}
        btn--${size}
        ${fullWidth ? "btn--full" : ""}
        ${icon ? "btn--icon" : ""}
      `}
    >
      {children}
    </button>
  );
}
