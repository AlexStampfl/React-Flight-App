import React from 'react';

function FlightForm(props) {
    const validReqs = props.validReqs;
    const flight = props.flightData;
    const handleChange = props.handleChange;
    const handleSubmit = props.handleSubmit;

    function isValid(field1, field2 = null) {
        return (
            validReqs[field1].error || validReqs[field2]
                ? "form-control is-invalid"
                : "form-control"
        )
    }

    return (
        <form>
            <div className="row">

                {/* ID */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Id: {validReqs.id.required && "*"}</label>
                    <input
                        name="id"
                        className={isValid('id', 'idExists')}
                        type="number"
                        min={validReqs.id.min}
                        max={validReqs.id.max}
                        value={flight.id}
                        onChange={handleChange} />

                    {validReqs.id.error &&
                        <div className="invalid-feedback">
                            {validReqs.id.error}
                        </div>
                    }
                    {validReqs.idExists &&
                        <div className="invalid-feedback">
                            {validReqs.idExists}
                        </div>
                    }
                </div>

                {/* Flight No: */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Flight No: {validReqs.flight_no.required && "*"}</label>
                    <input
                        name="flight_no"
                        className={isValid('flight_no')}
                        style={{ textTransform: 'uppercase' }}
                        maxLength={validReqs.flight_no.max}
                        value={flight.flight_no}
                        onChange={handleChange} />

                    {validReqs.flight_no.error &&
                        <div className="invalid-feedback">
                            {validReqs.flight_no.error}
                        </div>
                    }
                </div>

                {/* Airline */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Airline: {validReqs.airline.required && "*"}</label>
                    <input
                        name="airline"
                        className={isValid('airline')}
                        style={{ textTransform: 'capitalize' }}
                        maxLength={validReqs.airline.max}
                        value={flight.airline}
                        onChange={handleChange} />
                    {validReqs.airline.error &&
                        <div className="invalid-feedback">
                            {validReqs.airline.error}
                        </div>
                    }
                </div>

                {/* Trip Type */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Trip Type: {validReqs.trip_type.required && "*"}</label>
                    <select
                        name="trip_type"
                        className="form-control custom-select"
                        defaultValue={flight.trip_type}
                        onChange={handleChange}>
                        <option>One Way</option>
                        <option>Round Trip</option>
                        <option value="Multi">Multiple Destinations</option>
                    </select>
                </div>

                {/* Departure Airport */}
                <div className="form-group col-md-4">                   <br />
                    <label>Departure Airport: {validReqs.departure_airport.required && "*"}</label>
                    <input
                        name="departure_airport"
                        className={isValid('departure_airport')}
                        maxLength={validReqs.departure_airport.max}
                        style={{ textTransform: 'uppercase' }}
                        value={flight.departure_airport}
                        onChange={handleChange} />
                    {validReqs.departure_airport.error &&
                        <div className="invalid-feedback">
                            {validReqs.departure_airport.error}
                        </div>
                    }
                </div>

                {/* Arrival Airport */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Arrival Airport: {validReqs.arrival_airport.required && "*"}</label>
                    <input
                        name="arrival_airport"
                        className={isValid('arrival_airport', 'sameAirportError')}
                        maxLength={validReqs.arrival_airport.max}
                        style={{ textTransform: 'uppercase' }}
                        value={flight.arrival_airport}
                        onChange={handleChange} />

                    {validReqs.arrival_airport.error &&
                        <div className="invalid-feedback">
                            {validReqs.arrival_airport.error}
                        </div>
                    }
                    {validReqs.sameAirportError &&
                        <div className="invalid-feedback">
                            {validReqs.sameAirportError}
                        </div>
                    }
                </div>

                {/* Departure Date */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Departure Date: {validReqs.departure_date.required && "*"}</label>
                    <input
                        type="date"
                        name="departure_date"
                        className={isValid('departure_date')}
                        value={flight.departure_date}
                        onChange={handleChange} />
                    {validReqs.departure_date.error &&
                        <div className="invalid-feedback">
                            {validReqs.departure_date.error}
                        </div>
                    }
                </div>

                {/* Return Date */}
                <div className="form-group col-md-4">
                    <br />
                    <label>Return Date: {validReqs.return_date.required && "*"}</label>
                    <input
                        type="date"
                        name="return_date"
                        className={isValid('return_date', 'datesError')}
                        value={flight.return_date}
                        onChange={handleChange} />
                    {validReqs.return_date.error &&
                        <div className="invalid-feedback">
                            {validReqs.return_date.error}<br />
                        </div>
                    }
                    {validReqs.datesError &&
                        <div className="invalid-feedback">
                            {validReqs.datesError}
                        </div>
                    }
                </div>
                <br />
                <br />
            </div>
            <br />
            <button onClick={handleSubmit} class="btn btn-primary">Submit</button>
        </form>
    );
}

export default FlightForm;




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// import React from 'react';

// function FlightForm(props) {
//     const validReqs = props.validReqs;
//     const flight = props.flightData;
//     const handleChange = props.handleChange;
//     const handleSubmit = props.handleSubmit;

//     function isValid(field1, field2 = null) {
//         return (
//             this.validReqs[field1].error || validReqs[field2]
//                 ? "form-control is-invalid"
//                 : "form-control"
//         )
//     }

//     return (
//         <div className="container">
//             <br />
//             <h1 className="text-left">Add Flight Schedule</h1>
//             <br />
//             <div className="border p-4 bg-light">
//                 <p className="text-left font-weight-bold">Active Flight Schedule</p>

//                 <form onSubmit={this.handleSubmit}>
//                     <div className="row">
//                         <div className="form-group col-md-4">
//                             <br />
//                             {/* <label for="id">Id:</label> */}
//                             <label>Id:{validReqs.id.required && "*"} </label>
//                             <input
//                                 type="number"
//                                 name="id"
//                                 value={this.state.id}
//                                 onChange={handleChange}
//                                 placeholder="No."
//                                 className={isValid('id', 'idExists')}
//                                 min={validReqs.id.min}
//                                 max={validReqs.id.max} />

//                             {validReqs.id.error &&
//                                 <div className="invalid-feedback">
//                                     {validReqs.id.error}
//                                 </div>
//                             }
//                             {validReqs.idExists &&
//                                 <div className="invalid-feedback">
//                                     {validReqs.idExists}
//                                 </div>
//                             }
//                         </div>

//                         {/* Flight Number */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Flight No:{validReqs.flight_no.required && "*"}</label>
//                             <input
//                                 name="flight_no"
//                                 className={isValid('flight_no')}
//                                 style={{ textTransform: 'uppercase' }}
//                                 maxLength={validReqs.flight_no.max}
//                                 minLength={validReqs.flight_no.min}
//                                 value={flight.flight_no}
//                                 placeholder="Flight Number"
//                                 onChange={handleChange} />

//                             {validReqs.flight_no.error &&
//                                 <div className='invalid-feedback'>
//                                     {validReqs.flight_no.error}
//                                 </div>
//                             }
//                         </div>

//                         {/* Airline */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Airline:{validReqs.airline.required && "*"}</label>
//                             <input
//                                 name="airline"
//                                 className={isValid('airline')}
//                                 style={{ textTransform: 'capitalize' }}
//                                 maxLength={validReqs.airline.max}
//                                 value={flight.airline}
//                                 placeholder="Airline"
//                                 onChange={handleChange} />

//                             {validReqs.airline.error &&
//                                 <div className='invalid-feedback'>
//                                     {validReqs.airline.error}
//                                 </div>
//                             }
//                         </div>

//                         {/* Trip Type */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Trip Type:{validReqs.trip_type.required && "*"}</label>
//                             <select
//                                 name="trip_type"
//                                 className="form-control"
//                                 defaultValue={flight.trip_type}
//                                 placeholder="Trip Type"
//                                 onChange={handleChange}>
//                                 <option>One Way</option>
//                                 <option>Round Trip</option>
//                                 <option value="Multi">Multiple Destinations</option>
//                             </select>
//                         </div>

//                         {/* Departure Airport */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Departure Airport:{validReqs.departure_airport.required && "*"}</label>
//                             <input
//                                 name="departure_airport"
//                                 className={isValid('departure_airport')}
//                                 maxLength={validReqs.departure_airport.max}
//                                 style={{ textTransform: 'uppercase' }}
//                                 value={flight.departure_airport}
//                                 placeholder="Departure Airline"
//                                 onChange={handleChange} />
//                         </div>

//                         {/* Arrival Airport */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Arrival Airport:{validReqs.arrival_airport.required && "*"}</label>
//                             <input
//                                 name="arrival_airport"
//                                 className={isValid('arrival_airport', 'sameAirportError')}
//                                 maxLength={validReqs.arrival_airport.max}
//                                 style={{ textTransform: 'uppercase' }}
//                                 value={flight.arrival_airport}
//                                 placeholder="Arrival Airline"
//                                 onChange={handleChange}
//                             />
//                         </div>

//                         {/* Departure Date */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Departure Date:{validReqs.departure_date.required && "*"}</label>
//                             <input
//                                 type="date"
//                                 name="departure_date"
//                                 className={isValid('departure_date')}
//                                 value={flight.departure_date}
//                                 placeholder="Depart Date"
//                                 onChange={handleChange} />

//                             {validReqs.departure_date.error &&
//                                 <div className='invalid-feedback'>
//                                     {validReqs.departure_date.error}
//                                 </div>
//                             }
//                         </div>

//                         {/* Return Date */}
//                         <div className="form-group col-md-4">
//                             <br />
//                             <label>Return Date:{validReqs.return_date.required && "*"}</label>
//                             <input
//                                 type="date"
//                                 name="return_date"
//                                 className={isValid('return_date', 'datesError')}
//                                 value={flight.return_date}
//                                 placeholder="Return Date"
//                                 onChange={handleChange} />

//                             {validReqs.return_date.error &&
//                                 <div className='invalid-feedback'>
//                                     {validReqs.return_date.error}<br />
//                                 </div>
//                             }
//                         </div>

//                         <br />
//                         <br />
//                     </div>
//                     <br />
//                     <button onClick={handleSubmit} class="btn btn-primary">Submit</button>
//                 </form>
//                 <br />
//             </div>
//         </div>
//     );
// }

// export default FlightForm;