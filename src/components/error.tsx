interface ErrorProps {
  title: string;
  description?: string;
}

export const Error = ({ title, description }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h6 className="text-xl font-medium text-red-600 text-center">{title}</h6>
      <p className="text-techie-gray-600 text-center">{description}</p>
    </div>
  );
};
