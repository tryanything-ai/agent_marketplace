import cx from "classnames";
import { ElementType, LabelHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  as?: ElementType;
}

export const Label = ({
  children,
  htmlFor,
  className,
  as: Tag = "label",
}: LabelProps) => {
  return (
    <Tag
      className={twMerge(
        cx(
          "mb-1 flex items-center gap-2 font-bold",
          { "cursor-pointer": htmlFor },
          className
        )
      )}
      htmlFor={htmlFor}
    >
      {children}
    </Tag>
  );
};
