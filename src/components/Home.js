import React from 'react';
import flightImage from './flightImage.png';
import add_flight from './add_flight.png';
import { Link } from 'react-router-dom';

function Home(props){
    return (
        <div className="container">
            <div className="row mb-5">
                <br />
                <h1 className="text-left">Welcome to Flight App</h1>
                <br />
                <div className="col-lg-15 bg-light border p-4 bg-light rounded">
                    <p className="text-left">
                        The Flight App is a small app created in React.
                    </p>
                    <span className="m-4">
                        <Link to="/flights">
                            <img width="40%" src={flightImage} alt="flight app image"/>
                        </Link>
                    </span>
                    <span className="m-4">
                        <Link to="/add">
                            <img width="40%" src={add_flight} alt="add flight app image"/></Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Home;