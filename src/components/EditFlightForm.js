import React from 'react';

export default function EditFlightForm(props) {

  //EditFlighForm.js - a grandchild component that renders the form UI

  return (
    <form>
      <div className="row">
        <div className="form-group col-md-4">
        <br/>
          <label>Id:</label>
          <input
            name="id"
            className="form-control"
            type="number"
            defaultValue={props.flight.id}
            ref={props.newFlight.id}
            readOnly
          />
        </div>
        <div className="form-group col-md-4">
        <br/>
          <label>Flight No:</label>
          <input
            name="flight_no"
            className="form-control"
            style={{ textTransform: 'uppercase' }}
            defaultValue={props.flight.flight_no}
            ref={props.newFlight.flight_no}
          />
        </div>

        <div className="form-group col-md-4">
        <br/>
          <label>Airline:</label>
          <input
            type="text"
            name="airline"
            className="form-control"
            defaultValue={props.flight.airline}
            ref={props.newFlight.airline}
          />
        </div>
      
        <div className="form-group col-md-4">
        <br/>
          <label>Trip Type:</label>
          <select
            name="trip_type"
            className="form-control custom-select"
            defaultValue={props.flight.trip_type}
            ref={props.newFlight.trip_type}
          >
            <option>One Way</option>
            <option>Round Trip</option>
            <option value="Multi">Multiple Destinations</option>
          </select>
        </div>

        <div className="form-group col-md-4">
        <br/>
          <label>Departure Airport</label>
          <input
            type="text"
            name="departure_airport"
            defaultValue={props.flight.departure_airport}
            className="form-control"
            ref={props.newFlight.departure_airport}
          />
        </div>

        <div className="form-group col-md-4">
        <br/>
          <label>Arrival Airport:</label>
          <input
            type="text"
            name="arrival_airport"
            defaultValue={props.flight.arrival_airport}
            className="form-control"
            ref={props.newFlight.arrival_airport}
          />
        </div>

        <div className="form-group col-md-4">
        <br/>
          <label>Departure Date:</label>
          <input
            type="date"
            name="departure_date"
            defaultValue={props.flight.departure_date}
            className="form-control"
            ref={props.newFlight.departure_date}
          />
        </div>

        <div className="form-group col-md-4">
        <br/>
          <label>Return Date:</label>
          <input
            type="date"
            name="return_date"
            defaultValue={props.flight.return_date}
            className="form-control"
            ref={props.newFlight.return_date}
          />
        </div>

      </div>
      <br />
      <button onClick={props.handleSubmit} className="btn btn-danger btn-just-icon btn-lg">
        Update
      </button>
    </form>
  );
}