import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import type { IInputProps } from "../../../types/Components";
import "./styles.scss";

const Input = forwardRef<HTMLTextAreaElement | HTMLInputElement, IInputProps>(
  (
    {
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
    },
    ref 
  ) => {
    const localTextareaRef = useRef<HTMLTextAreaElement>(null);
    const localInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
      return multiline 
        ? (localTextareaRef.current as any) 
        : (localInputRef.current as any);
    });

    useEffect(() => {
      if (multiline && localTextareaRef.current) {
        localTextareaRef.current.style.height = "auto";
        localTextareaRef.current.style.height = `${localTextareaRef.current.scrollHeight}px`;
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
            ref={localTextareaRef} 
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
            ref={localInputRef}
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
);

export default Input;