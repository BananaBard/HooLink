import { ReactNode } from "react";

/// Parent of this tooltip should have className="group relative"

interface TooltipProps {
  children: ReactNode;
  message: string;
}

function Tooltip({ children, message }: TooltipProps) {
  return (
    <div className="group relative">
      {children}

      <span className="absolute -mt-12 -left-14 whitespace-nowrap tooltip invisible group-hover:visible group-hover:z-10 rounded p-2 bg-neutral-200 text-black opacity-0 group-hover:opacity-100 transition-all">
        {message}
      </span>
    </div>
  );
}

export default Tooltip;
