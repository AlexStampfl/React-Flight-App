import React from 'react';
import { Link } from 'react-router-dom';

function FlightList(props){
    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-5">
            <br />
              <h1 className="text-left">Flight Schedule</h1>
              <div className="table-responsive border p-4 bg-light">
                <p className="text-left font-weight-bold">Active Flight Schedule</p>              
            
                <table className="table table-hover">
                  <thead className="table-borderless table-secondary">
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Airline</th>
                      <th scope="col">Flight Number</th>
                      <th scope="col">Trip Type</th>
                      <th scope="col">Departure Airport</th>
                      <th scope="col">Arrival Airport</th>
                      <th scope="col">Departure Date</th>
                      <th scope="col">Return Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { props.flightData.map( flight  =>{
                      return(
                        <tr key={flight.id}>
                      <td scope="row">{flight.id}</td>
                      <td>{flight.airline}</td>
                      <td>{flight.flight_no}</td>
                      <td>{flight.trip_type}</td>
                      <td>{flight.departure_airport}</td>
                      <td>{flight.arrival_airport}</td>
                      <td>{flight.departure_date}</td>
                      <td>{flight.return_date}</td>
                      <td>
                      {/* this caused the bootstrap layout to disappear, you need to let React handle it so it doesn't flicker, use <Link> and to not href */}
                        <Link type="button" style={{marginLeft:"10px"}}
                        className="btn btn-success btn-just-icon btn-sm"
                        to={"/edit/" + flight.id}>Edit</Link>
                        <button onClick={()=>{
                          props.deleteFlight(flight.id)}}
                          type="button"
                          className="btn btn-sm btn-danger ml-2">Delete</button>
                      </td>
                    </tr>
                      )
                    })
                    }
                  </tbody>
                </table>
            
              </div>
            </div>
          </div>
        </div>
    );
};

export default FlightList