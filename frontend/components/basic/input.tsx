import cx from "classnames";
import { forwardRef, InputHTMLAttributes, ReactNode, Ref, useId } from "react";

import { Label } from "./label";

const iconClass =
  "absolute top-1/2 transform -translate-y-1/2 [&>svg]:max-w-min";

const variantClassname = {
  solid: "bg-base-300 border-base-300 focus:border-base-300",
  bordered: "bg-transparent border-base-300 focus:border-base-300",
  ghost: "border-transparent disabled:bg-transparent focus:border-transparent",
};

const sizeClassname = {
  xs: "input-xs h-8 px-2.5",
  sm: "input-sm h-9 px-3",
  md: "h-10 px-4",
  lg: "input-lg h-11 px-5",
};

const iconSizeClassname = {
  xs: "[&>svg]:max-h-3.5",
  sm: "[&>svg]:max-h-4",
  md: "[&>svg]:max-h-5",
  lg: "[&>svg]:max-h-6",
};

const leftIconPaddingClassname = {
  xs: "pl-7",
  sm: "pl-8",
  md: "pl-10",
  lg: "pl-12",
};

const rightIconPaddingClassname = {
  xs: "pr-7",
  sm: "pr-8",
  md: "pr-10",
  lg: "pr-12",
};

const leftIconPositionClassname = {
  xs: "left-2.5",
  sm: "left-3",
  md: "left-3.5",
  lg: "left-4",
};

const rightIconPositionClassname = {
  xs: "right-2.5",
  sm: "right-3",
  md: "right-3.5",
  lg: "right-4",
};

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: keyof typeof variantClassname;
  size?: keyof typeof sizeClassname;
  placeholder?: string;
  label?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  block?: boolean;
  error?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export type InputProps = BaseInputProps & {
  ref?: Ref<HTMLInputElement>;
};

export const Input = forwardRef(
  (
    {
      variant = "solid",
      size = "md",
      placeholder,
      label,
      topRightLabel,
      bottomLeftLabel,
      bottomRightLabel,
      leftIcon,
      rightIcon,
      disabled,
      block,
      error,
      className,
      onValueChange,
      onChange: baseOnChange,
      ...props
    }: InputProps,
    ref?: Ref<HTMLInputElement>
  ) => {
    const id = useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      onValueChange?.(value);
      baseOnChange?.(event);
    };

    return (
      <div
        className={cx(
          "flex-col relative",
          block ? "flex" : "inline-flex",
          className
        )}
      >
        {/* Labels */}
        {(label || topRightLabel) && (
          <div className="label py-0">
            {label && <Label htmlFor={id}>{label}</Label>}
            {topRightLabel && <Label>{topRightLabel}</Label>}
          </div>
        )}
        {/* Left Icon */}
        {leftIcon && (
          <span
            className={cx(
              iconClass,
              iconSizeClassname[size],
              leftIconPositionClassname[size],
              "text-base-content-neutral"
            )}
          >
            {leftIcon}
          </span>
        )}
        <input
          {...props}
          id={id}
          ref={ref}
          disabled={disabled}
          onChange={handleChange}
          placeholder={placeholder}
          className={cx(
            "input",
            "border-2",
            "text-base-content",
            "placeholder:text-base-content-neutral",
            "focus:outline-none focus:ring-4",
            "w-full",
            variantClassname[variant],
            sizeClassname[size],
            leftIcon && leftIconPaddingClassname[size],
            rightIcon && rightIconPaddingClassname[size],
            error
              ? "!border-error focus:!border-error focus:ring-error/30"
              : "focus:ring-primary/30"
          )}
        />
        {/* Right Icon */}
        {rightIcon && (
          <span
            className={cx(
              iconClass,
              iconSizeClassname[size],
              rightIconPositionClassname[size],
              "text-base-content-neutral"
            )}
          >
            {rightIcon}
          </span>
        )}
        {/* Bottom labels */}
        {(bottomLeftLabel || bottomRightLabel) && (
          <div className="label mt-1 py-0">
            {bottomLeftLabel && (
              <Label className="mb-0">{bottomLeftLabel}</Label>
            )}
            {bottomRightLabel && (
              <Label className="mb-0">{bottomRightLabel}</Label>
            )}
          </div>
        )}
        {/* Error Message */}
        {error && (
          <label className="label mt-1 py-0">
            <span className="label-text text-error">{error}</span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
