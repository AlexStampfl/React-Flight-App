
import React from 'react';
import { useParams } from 'react-router-dom';
import EditFlightForm from '../src/components/EditFlightForm';

//EditFlight.js - the child component that manages and collects the form data

export default class EditFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Initialize state properties for form fields
      id: 0,
      airline: '',
      flight_no: '',
      trip_type: '',
      departure_airport: '',
      arrival_airport: '',
      departure_date: '',
      return_date: ''
    };
  }
  id = parseInt(useParams().id)
  index = this.props.flightData.findIndex(obj => obj.id === id);

  // original
  flight = (this.index !== -1) ? this.props.flightData[this.index] : this.props.flightData[0];

  // const newFlight = 
  // {
  //     "id":React.createRef(),
  //     "airline":React.createRef(),
  //     "flight_no":React.createRef(),
  //     "trip_type":React.createRef(),
  //     "departure_airport":React.createRef(),
  //     "arrival_airport":React.createRef(),
  //     "departure_date":React.createRef(),
  //     "return_date":React.createRef(),
  // }

  handleSubmit = (e) => {
    // prevent flicker
    e.preventDefault();
    console.log(this.state);
    console.log(this.flight);
    // pass to App.js (parent) //pass data up tree
    this.props.updateFlight(index, this.state);
  }

  // const handleSubmit = (event) => props.updateFlight(index, flight); //update the data
  render() {
    return (
      <div className="container">
        <div className="row mb-5">
          <h1 className="text-left">Edit Flight Schedule</h1>
          <div className="table-responsive border p-4 bg-light rounded">

            <EditFlightForm flight={flight} newFlight={this.state} handleSubmit={handleSubmit} />

          </div>
        </div>
      </div>
    )
  }
}