import Magnifier from "../assets/magnifier.svg";

export const SearchBar = () => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-techie-gray-300 p-2 transition-all focus-within:border-orange-600">
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none"
      />
      <Magnifier />
    </div>
  );
};
