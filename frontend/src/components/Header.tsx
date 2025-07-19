import { PawPrint } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
          PetPost
          <PawPrint />
        </h1>
      </div>
    </header>
  );
};

export default Header;
