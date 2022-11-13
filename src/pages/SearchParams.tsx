import {  useContext, useState } from "react";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
import useBreedList from "../hooks/useBreedList";
import usePetsSearch from "../hooks/usePetsSearch";
import Loader from "../components/Loader";
import Results from "../components/Results";
import { Animal, SearchParams as SearchParamsType} from "../types/common";


const ANIMALS = ["bird", "cat", "dog", "reptile","rabbit"];

const SearchParams = ()=>{
    const [searchParams,setSearchParams]=useState <SearchParamsType>({
      location:'',
      animal:'' as Animal,
      breed:'',
    });
    const [adoptedPet]= useContext(AdoptedPetContext);

     const petsQuery = usePetsSearch(searchParams);
     const pets = petsQuery?.data?.pets ?? [] ;

    const breedsQuery = useBreedList(searchParams.animal);
    const breeds = breedsQuery?.data?.breeds ?? [];

    return (
      <div className="search-params">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const animal = formData.get('animal');
            const location = formData.get('location');
            const breed = formData.get('breed');
            setSearchParams({ animal, location, breed } as SearchParamsType);
          }}
        >
          {adoptedPet && (
            <div className="pet image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name}/>
            </div>
          )}
          <label htmlFor="location">
            Location
            <input id="location" placeholder="Location" name="location" />
          </label>
          <label htmlFor="animal">
            animal
            <select
              id="animal"
              name="animal"
              onChange={(e) => { 
                setSearchParams({
                  ...searchParams,
                  animal: e.target.value as Animal,
                  breed: '',
                });
              }}
            >
              <option />
              {ANIMALS.map((animal) => (
                <option value={animal} key={animal}>
                  {animal}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select disabled={!breeds.length} id="breed" name="breed">
              <option />
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </label>
          <button>submit</button>
        </form>
        {petsQuery.isLoading && (
          <div className="search loader-container">
            <Loader />
          </div>
        )}
        {petsQuery.isError && <span>{(petsQuery.error as Error).message}</span>}
        {petsQuery.data && (
          
            <Results pets={pets} />
          
        )}
      </div>
    );
};
export default SearchParams;