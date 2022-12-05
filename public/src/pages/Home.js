import bankImg from '../img/bank.png';
import CardComponent from '../components/CardComponent';
import Carousel from 'react-bootstrap/Carousel';

import img1 from '../img/carrousel1.jpg' ;
import img2 from '../img/carrousel2.jpg' ;

function Home() {
  return (
    <> 
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>The Bankapp Project</h3>
            <p>Project of bank app with MERN ( MongoDB, Express, React.js, Node.js )</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Arturo Soberanes</h3>
            <p>This application was made by Arturo Soberanes and under the MIT license.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>      
      <div className="container d-flex justify-content-center align-items-center mt-5">
        <CardComponent
          bgcolor="dark"
          txtcolor="white"
          header="BadBank Landing Page"
          title="Welcome to the Bank"
          text="You can use this bank"
          body={(<img src={bankImg} className="img-fluid" alt="Welcome to the Bad-Bank" />)}
        />
      </div>
    </>
  );
}

export default Home;
