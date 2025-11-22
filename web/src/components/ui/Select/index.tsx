import type { ISelectProps } from "../../../types/Components";
import "./styles.scss";

export default function Select({
  label,
  value,
  onChange,
  options,
  disabled = false,
}: ISelectProps) {
  return (
    <div className={`select-wrapper ${disabled ? "disabled" : ""}`}>
      {label && <label className="select-label">{label}</label>}

      <div className="select-container">
        <select
          className={`select ${value === "" ? "placeholder" : ""}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled hidden>
            Selecione...
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}