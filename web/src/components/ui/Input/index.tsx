// Types
import type { IInputProps } from "../../../types/Components";
// Styles
import "./styles.scss";
 
export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  error,
  disabled = false,
  fullWidth = false,
  onChange,
  onKeyDown
}: IInputProps) {
  return (
    <div className={`input-wrapper ${fullWidth ? "full" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <input
        className={`input ${error ? "input--error" : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
