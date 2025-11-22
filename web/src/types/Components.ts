import type { ReactNode } from "react";

export type TButtonVariant = "primary" | "primary-alt" | "outline";
export type TButtonSize = "sm" | "md" | "lg";
export type TInputType = "text" | "email" | "password" | "number";

export interface IButtonProps {
  children: React.ReactNode;
  variant?: TButtonVariant;
  size?: TButtonSize;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
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
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IPageLayoutProps {
  children: ReactNode;
  centered?: boolean; 
}

export interface IPageHeaderProps {
  title: string;
  showBack?: boolean;
}

export interface IBrandProps {
  showTagline?: boolean;
  center?: boolean;
}
