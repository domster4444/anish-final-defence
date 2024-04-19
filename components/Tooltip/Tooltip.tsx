interface TooltipProps {
  message: string;
  children: React.ReactNode;
}

export default function Tooltip({ message, children }: TooltipProps) {
  return (
    <div className='group relative flex cursor-pointer'>
      {children}
      <span
        style={{
          bottom: "1.5rem",
        }}
        className=' absolute intel_400 left-0  scale-0 transition-all rounded bg-white shadow-md p-2 text-xs text-black group-hover:scale-100'
      >
        {message}
      </span>
    </div>
  );
}
