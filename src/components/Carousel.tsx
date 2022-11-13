import { Component } from 'react';

type Props = {
 images: string[];
};
type State = {
  active:number;
}

class Carsouel extends Component <Props,State> {
  state = {
    active: 0,
  };
  static defaultProps = {
    images: ['http://pets-images.dev-apis.com/pets/none.jpg'],
  };

  render() {
    const { images } = this.props;
    const { active } = this.state;
    return (
      <div className="carsouel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller" >
          {images.map((img, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <img
              key={img}
              src={img}
              alt="animal"
              className={index === active ? 'active' : ''}
              data-index={index}
              onClick={(e:React.MouseEvent<HTMLImageElement>) => {
                 if (!(e.target instanceof HTMLImageElement)) {
                   return;
                 }
                 if (e.target.dataset.index){
                  this.setState({ active: +e.target.dataset.index });
                 } 
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carsouel;
