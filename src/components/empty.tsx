interface EmptyProps {
  title: string;
  description?: string;
}

export const Empty = ({ title, description }: EmptyProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h6 className="text-center font-title text-xl font-medium text-blue-600">
        {title}
      </h6>
      <p className="text-center font-text text-techie-gray-600">
        {description}
      </p>
    </div>
  );
};
