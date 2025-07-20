import useSWR from "swr";
import { LoaderCircle } from "lucide-react";
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

const API_URL = import.meta.env.VITE_API_URL;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function PetsTable() {
  const {
    data: pets,
    error,
    isLoading,
  } = useSWR<Pet[]>(`${API_URL}/api/pets`, fetcher);

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">Failed to load pets</div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <LoaderCircle className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
          {pets?.map((pet) => (
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
