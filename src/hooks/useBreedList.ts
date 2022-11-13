import { QueryFunction, useQuery } from "@tanstack/react-query";
import { Animal, FetchBreedsResponse } from "../types/common";


const fetchBreedList: QueryFunction<BreedsResponse,['breeds',Animal]> = async ({
  queryKey,
}) => {
  const [, animal] = queryKey;

  if (!animal) return [];
  const res = await fetch(
    `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
  );
  return res.json();
};
const useBreedList = (animal:Animal)=>{
    return useQuery(['breeds', animal],fetchBreedList);
    
};
export default useBreedList;
