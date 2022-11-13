import {Link} from 'react-router-dom';


type Props = {
  animal:string,
  name:string,
  images:string[],
  breed:string,
  location:string,
  id:number
};

const Pet = (props:Props)=>{
    const {animal,name,images,breed,location,id}=props;

    let img = "http://pets-images.dev-apis.com/pets/none.jpg";
    if(images.length){
        img = images[0];
    }

    return (
      <Link to={`/details/${id}`} className="pet">
        <div className="image-container">
          <img src={img} alt={name} />
        </div>
        <div className="info">
          <h1>name : {name}</h1>
          <h2>animal :{animal} </h2>
          <h2> breed :{breed} </h2>
          <h2>location : {location}</h2>
        </div>
      </Link>
    );
};
 


export default Pet;