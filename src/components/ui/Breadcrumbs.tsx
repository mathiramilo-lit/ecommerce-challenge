interface BreadcrumbsProps {
  onClick: () => void;
  category: string;
}

export const Breadcrumbs = ({ onClick, category }: BreadcrumbsProps) => {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        className="text-sm text-gray-400 hover:text-orange-600 font-bold transition-colors"
        onClick={onClick}
      >
        All products
      </button>
      <span className="text-sm font-bold text-orange-600">{">"}</span>
      <p className="text-sm font-bold">{category}</p>
    </div>
  );
};
