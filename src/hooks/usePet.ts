import { QueryFunction, useQuery} from '@tanstack/react-query';
import { SearchPetResponse } from '../types/common';


const fetchPet: QueryFunction<SearchPetResponse , ['pet',number]> = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
  return res.json();
};

const usePet = (petId:number) => {
   return useQuery(['pet',petId], fetchPet);
};
export default usePet;
