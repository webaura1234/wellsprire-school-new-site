import { Children, isValidElement, type ReactNode } from "react";
export function Heading({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const lines: ReactNode[][] = [[]];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === "br") lines.push([]);
    else lines[lines.length - 1].push(child);
  });
  return (
    <Tag className={className} {...props}>
      {lines.map((line, i) => (
        <span className="heading-mask" key={i}>
          <span className="heading-line">{line}</span>
        </span>
      ))}
    </Tag>
  );
}
