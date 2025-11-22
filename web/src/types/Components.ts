import type { ReactNode } from "react";

export type TButtonVariant = "primary" | "primary-alt" | "outline";
export type TButtonSize = "sm" | "md" | "lg";
export type TInputType = "text" | "email" | "password" | "number";

export interface IButtonProps {
  children: ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  icon?: boolean;
}

export interface IInputProps {
  label?: string;
  type?: TInputType;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface ISelectOption {
  label: string;
  value: string;
}

export interface ISelectProps {
  label?: string;
  value: string | "";
  disabled?: boolean;
  options: ISelectOption[];
  onChange: (value: string) => void;
}

export interface IPageLayoutProps {
  children: ReactNode;
  centered?: boolean;
  full?: boolean;
}

export interface ITopbarProps {
  title: string;
  showBack?: boolean;
  fixed?: boolean;
  onMenuClick?: () => void;
}

export interface IBrandProps {
  showTagline?: boolean;
  center?: boolean;
}
