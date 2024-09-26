interface ErrorProps {
  title: string;
  description?: string;
}

export const Error = ({ title, description }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h6 className="font-title text-center text-xl font-medium text-red-600">
        {title}
      </h6>
      <p className="font-text text-center text-techie-gray-600">
        {description}
      </p>
    </div>
  );
};
