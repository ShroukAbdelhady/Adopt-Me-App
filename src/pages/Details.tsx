import { lazy, useContext, useState } from "react";
import {useParams,useNavigate} from "react-router-dom";
import AdoptedPetContext from "../contexts/AdoptedPetContext";
import usePet from "../hooks/usePet";
import Carousel from "../components/Carousel";
import Loader from "../components/Loader";
import { Pet } from "../types/common";
// import Modal from "./Modal";

const Modal = lazy(() => import('../components/Modal'));

const Details = ()=>{
  const [showModal , setShowModal]= useState(false);
  const [, setAdoptedPet]= useContext(AdoptedPetContext);
  const { id } = useParams();
  if(!id){
    throw new Error ("no id provided to details page ")
    
  }
  const petQuery = usePet(+id);
  const navigate = useNavigate();
  const pet = petQuery?.data?.pets[0] as Pet;
  
    return (
      <div className="details">
        {petQuery.isLoading && (
          <div className="loader-container">
            <Loader />
          </div>
        )}
        {petQuery.isError && <span>{(petQuery.error as Error).message}</span>}
        {petQuery.data && (
          <div>
            <Carousel images={pet.images} />
            <h1> {pet.name} </h1>
            <h2>
              `{pet.animal}-{pet.breed}-{pet.city}-{pet.state}`
            </h2>
            <button onClick={() => setShowModal(true)}>
              {' '}
              Adopt {pet.name}
            </button>
            <p> {pet.description} </p>
            <button
              onClick={() => {
                navigate('/');
              }}
            >
              Back
            </button>
            {showModal && (
              <Modal>
                <div>
                  <h1> would you like to adopt {pet.name} ? </h1>
                  <div className="buttons">
                    <button
                      onClick={() => {
                        setAdoptedPet(pet);
                        navigate('/');
                      }}
                    >
                      {' '}
                      Yes{' '}
                    </button>
                    <button
                      onClick={() => {
                        setShowModal(false);
                      }}
                    >
                      {' '}
                      Cancel{' '}
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        )}
      </div>
    );
};
export default Details;