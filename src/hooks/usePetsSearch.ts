import { QueryFunction, useQuery } from "@tanstack/react-query"
import { SearchParams, SearchPetResponse } from "../types/common";

const fetchPets: QueryFunction<SearchPetResponse,['search-pets', SearchParams]> = async ({
  queryKey,
}) => {
  const [, { animal, location, breed }] = queryKey;
  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&city=${location}&breed=${breed}`
  );
  return res.json();
};

const usePetsSearch = (searchParams:SearchParams) => {
  return useQuery(['search-pets', searchParams],fetchPets);
};
export default usePetsSearch;