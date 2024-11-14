
import React from 'react';
import { useParams } from 'react-router-dom';
import EditFlightForm from './EditFlightForm';

//EditFlight.js - the child component that manages and collects the form data
export default function EditFlight(props){
    
  // gets data for url
    const id = parseInt(useParams().id)
    const index = props.flightData.findIndex(obj => obj.id === id);
    console.log(index)

    // original
    const flight = (index !== -1) ? props.flightData[index] : props.flightData[0];

    const newFlight = 
    {
        "id":React.createRef(),
        "airline":React.createRef(),
        "flight_no":React.createRef(),
        "trip_type":React.createRef(),
        "departure_airport":React.createRef(),
        "arrival_airport":React.createRef(),
        "departure_date":React.createRef(),
        "return_date":React.createRef(),
    }

    const handleSubmit = (e) => {
      // prevent flicker
      e.preventDefault();
      console.log(newFlight);
      console.log(flight);
      // get data from object
      console.log(newFlight.airline.current.value);
      // pass to App.js (parent) //pass data up tree

      const data = {};

      // rebuild object to edit
      newFlight.id = parseInt(newFlight.id.current.value)
      newFlight.airline = newFlight.airline.current.value
      newFlight.flight_no = newFlight.flight_no.current.value
      newFlight.trip_type = newFlight.trip_type.current.value
      newFlight.departure_airport = newFlight.departure_airport.current.value
      newFlight.arrival_airport = newFlight.arrival_airport.current.value
      newFlight.departure_date = newFlight.departure_date.current.value
      newFlight.return_date = newFlight.return_date.current.value

      // // rebuild object to edit
      // data.id = parseInt(newFlight.id.current.value)
      // data.airline = newFlight.airline.current.value
      // data.flight_no = newFlight.flight_no.current.value
      // data.trip_type = newFlight.trip_type.current.value
      // data.departure_airport = newFlight.departure_airport.current.value
      // data.arrival_airport = newFlight.arrival_airport.current.value
      // data.departure_date = newFlight.departure_date.current.value
      // data.return_date = newFlight.return_date.current.value

      props.updateFlight(index, newFlight);
    }

    return (
        <div className="container">
          <br />
        {/* <div className="row mb-7"> */}
          <h1 className="text-left">Edit Flight Schedule</h1>
          <br />
          {/* <div className="table-responsive border p-4 bg-light rounded"> */}
          <div className="border p-4 bg-light">
            
            <EditFlightForm flight={flight} newFlight={newFlight} handleSubmit={handleSubmit}/>
           
          </div>
        {/* </div> */}
      </div>
    )
}