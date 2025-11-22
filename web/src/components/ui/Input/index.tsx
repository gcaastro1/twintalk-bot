import { useEffect, useRef } from "react";
import type { IInputProps } from "../../../types/Components";
import "./styles.scss";

export default function Input({
  label,
  type = "text",
  value,
  placeholder,
  error,
  disabled = false,
  fullWidth = false,
  multiline = false,
  onChange,
  onKeyDown,
}: IInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  const handleKeyDown = (e: React.KeyboardEvent<any>) => {
    if (onKeyDown) {
      if (multiline && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onKeyDown(e as any);
      } else {
        onKeyDown(e as any);
      }
    }
  };

  return (
    <div className={`input-wrapper ${fullWidth ? "full" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      {multiline ? (
        <textarea
          ref={textareaRef}
          className={`input input--textarea ${error ? "input--error" : ""}`}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
      ) : (
        <input
          className={`input ${error ? "input--error" : ""}`}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />
      )}

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
