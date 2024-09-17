import HamburgerMenu from '../assets/hamburger-menu.svg';
import { SearchBar } from './search-bar';
import { SortBy } from './sort-by';

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="p-2 flex items-center justify-center border-2 border-orange-600 rounded-full">
          <HamburgerMenu />
        </div>
        <h1 className="text-2xl font-medium text-techie-gray-900">
          Find what you need
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar />
        <SortBy />
      </div>
    </header>
  );
};
