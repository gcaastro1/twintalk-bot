import type { IButtonProps } from "../../../types/Components";
import "./styles.scss";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  onClick,
  type = "button",
  fullWidth = false,
  icon = false,
}: IButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        btn
        btn--${variant}
        btn--${size}
        ${fullWidth ? "btn--full" : ""}
        ${icon ? "btn--icon" : ""}
        ${loading ? "btn--loading" : ""}
        ${className} 
      `}
    >
      {loading ? <span className="loader"></span> : children}
    </button>
  );
}
