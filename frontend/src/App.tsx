import { PetsTable } from "@/components/PetsTable";
import Header from "@/components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <PetsTable />
      </main>
    </div>
  );
}

export default App;
