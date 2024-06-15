interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  icon: any
}
export default function IconButton(props: IconButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className="px-5 py-2.5 text-sm font-medium text-white inline-flex gap-2 items-center bg-neutral-800 border border-neutral-400 focus:ring-4 focus:outline-none focus:ring-neutral-300 rounded-lg text-center"
    >
      {
        props.icon && props.icon
      }
      {props.children}
    </button>
  );
}
