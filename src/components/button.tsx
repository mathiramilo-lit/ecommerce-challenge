import { Loader } from './loader';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
}

export const Button = ({
  children,
  onClick,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className="flex items-center justify-center gap-4 py-2 px-6 rounded-full text-white font-medium bg-orange-600 hover:bg-orange-500 transition-all"
      onClick={onClick}
      disabled={loading}
      {...props}
    >
      {children}
      {loading && <Loader />}
    </button>
  );
};
