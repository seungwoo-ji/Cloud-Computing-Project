import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddPetForm } from "./AddPetForm";

interface Pet {
  id: string;
  name: string;
  age: number;
  breed: string;
  imageUrl: string;
}

// Sample data - replace with your actual data
const pets: Pet[] = [
  {
    id: "1",
    name: "Max",
    age: 3,
    breed: "Golden Retriever",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dog_Breeds.jpg/960px-Dog_Breeds.jpg",
  },
  {
    id: "2",
    name: "Luna",
    age: 2,
    breed: "Siamese Cat",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dog_Breeds.jpg/960px-Dog_Breeds.jpg",
  },
];

export function PetsTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <AddPetForm />
      </div>
      <Table>
        <TableCaption>A list of our lovely friends.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Name</TableHead>
            <TableHead className="text-center">Age</TableHead>
            <TableHead className="text-center">Breed</TableHead>
            <TableHead className="text-center">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pets.map((pet) => (
            <TableRow key={pet.id}>
              <TableCell className="font-medium text-center">
                {pet.name}
              </TableCell>
              <TableCell className="text-center">{pet.age} years</TableCell>
              <TableCell className="text-center">{pet.breed}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <img
                    src={pet.imageUrl}
                    alt={`${pet.name} the ${pet.breed}`}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
