import type { FC } from "react";

interface CustomDivProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: string;
  shadow?: string;
}

const CustomDiv: FC<CustomDivProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default CustomDiv;
