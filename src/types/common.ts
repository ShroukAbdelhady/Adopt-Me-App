export type Animal = "bird"| "cat" |"dog"| "reptile" |"rabbit";

export interface Pet {
  key: number;
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  description:string;
  id: number;
  city: string;
  state: string;
};
export interface SearchPetResponse {
  numberOfResults: number;
  startIndex: number;
  endIndex: number;
  hasNext: boolean;
  pets: Pet[];
}
export interface BreedsResponse {
  animal: Animal;
  breeds: string[];
}
export interface SearchParams {
  location:string;
  animal:Animal;
  breed:string;
}


