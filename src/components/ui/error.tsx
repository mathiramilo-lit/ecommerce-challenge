interface ErrorProps {
  message: string;
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h6 className="font-title text-center text-xl font-medium text-red-600">
        Something went wrong
      </h6>
      <p className="font-text text-center text-techie-gray-600">{message}</p>
    </div>
  );
};
