import cx from "classnames";
import React, { forwardRef, Ref, TextareaHTMLAttributes } from "react";

import { Label } from "./label";

const variantClassname = {
  solid: "bg-base-300 border-base-300 focus:border-base-300",
  bordered: "bg-transparent border-base-300 focus:border-base-300",
  ghost: "border-transparent disabled:bg-transparent focus:border-transparent",
};

export interface BaseTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: keyof typeof variantClassname;
  label?: string;
  block?: boolean;
  error?: string;
  controlId?: string;
  onValueChange?: (value: string) => void;
}

export type TextAreaProps = BaseTextAreaProps & {
  ref?: Ref<HTMLTextAreaElement>;
};

export const TextArea = forwardRef(
  (
    {
      className,
      label,
      error,
      variant = "solid",
      block = false,
      controlId,
      onValueChange,
      onChange: baseOnChange,
      maxLength,
      ...props
    }: TextAreaProps,
    ref?: Ref<HTMLTextAreaElement>
  ) => {
    const handleChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      const { value } = event.currentTarget;
      onValueChange?.(value);
      baseOnChange?.(event);
    };

    return (
      <div className={cx({ "inline-block": !block, className })}>
        {label && <Label htmlFor={controlId}>{label}</Label>}
        <div className="relative">
          <textarea
            id={controlId}
            ref={ref}
            onChange={handleChange}
            maxLength={maxLength}
            {...props}
            className={cx(
              "border-2",
              "text-base-content",
              "placeholder:text-base-content-neutral",
              "focus:outline-none focus:ring-4",
              "w-full",
              "px-4 py-2",
              "rounded-btn",
              variantClassname[variant],
              error
                ? "!border-error focus:!border-error focus:ring-error/30"
                : "focus:ring-primary/30"
            )}
          />
        </div>
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

TextArea.displayName = "TextArea";
