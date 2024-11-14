
import React from 'react';
import FlightForm from './FlightForm';

class AddFlight extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.initState();
    }

    errorCounts = 0;  // Form control error flag
    submitted = false;  // Successful form submission flag

    render() {
        return (
            <div className="container">
              <br />
                    <h1 className="text-left">Add Flight Schedule</h1>
                    <br />
                    <div className="border p-4 bg-light">
                        <p className="text-left font-weight-bold">Active Flight Schedule</p>
                        {this.submitted &&
                            <p className="text-center alert alert-success p-2 rounded">
                                Successfully Added!
                            </p>
                        }
                        {this.errorCounts > 0 &&
                            <p className="text-center alert alert-danger p-2">
                                Sorry, something went wrong!
                            </p>
                        }
                        {!this.submitted &&
                            <FlightForm
                                flightData={this.state.flightData}
                                validReqs={this.state.validReqs}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}>
                            </FlightForm>
                        }
                    </div>
                </div>
        );
    }

    // Return today's date (YYYY-MM-DD)
    getTodayDate = () => {
        let date = new Date();
        return date.toISOString().substr(0, 10);
    }

    // initializes the state with default values and validation requirements
    initState = () => {
        // Empty data template (shape of our object)
        let flightData = {
            id: 1,
            flight_no: '',
            airline: '',
            trip_type: 'One Way',
            departure_airport: '',
            arrival_airport: '',
            departure_date: this.getTodayDate(),
            return_date: ''
        }
        //Validation requirements
        let validReqs = {
            id: { required: true, min: 1, max: 99999, error: null },
            flight_no: { required: true, min: 5, max: 10, error: null },
            airline: { required: true, min: 2, max: 25, error: null },
            trip_type: { required: true, error: null },
            departure_airport: { required: true, min: 2, max: 5, error: null },
            arrival_airport: { required: true, min: 2, max: 5, error: null },
            departure_date: { required: true, error: null },
            return_date: { required: true, error: null },
            idExists: null,
            sameAirportError: null,
            datesError: null,
        }
        return ({ flightData, validReqs })
    }

    // Reset the state to blank
    resetState = () => {
        this.setState(this.initState());
    }


    // handles input changes and updates the state
    handleChange = (event) => {
        this.error = false;
        this.submitted = false;
        let flightData = this.state.flightData;
        let validReqs = this.state.validReqs;
        let { name, value } = event.target;
        validReqs[name].error = false;

        if (name === 'departure_date' || name === 'return_date') {
            validReqs.datesError = null;
        }

        flightData[name] = value;
        this.setState({ flightData, validReqs })
    }

    // handles form submission and validates the form
    handleSubmit = (event) => {
        event.preventDefault();
        let flightData = this.state.flightData;

        let { validReqs, errorCounts } = this.validateForm();
        this.errorCounts = errorCounts;

        // Update state
        this.setState({ flightData });
        this.setState({ validReqs });

        if (this.errorCounts === 0) {
            this.props.addFlight(this.state.flightData);
            this.resetState();
            this.submitted = true;
        } else {
            console.log("***ERRORS***")
        }

    }

    // Validate form control
    validateForm = () => {
        let errorCounts = 0;
        let flightData = this.state.flightData;
        let validReqs = this.state.validReqs;

        // Extract the values for all id fields from full data set
        let values = this.props.flightData.map(e => e.id);

        // Check for unique id - if exists then try again
        if (values.indexOf(flightData.id) !== -1) {
            validReqs.idExists = ERROR_MESSAGES.idExists;
            errorCounts++;
        }

        // Check if id is within number range
        if (flightData.id < validReqs.id.min) {
            validReqs.id.error = ERROR_MESSAGES.idError;
            errorCounts++;
        }

        // Check if Flight No is within character range
        errorCounts += checkLength(flightData, validReqs, "flight_no", "flight_noError") ? 1 : 0;

        // Check if Airline is within character range
        errorCounts += checkLength(flightData, validReqs, "airline", "airlineError") ? 1 : 0;

        // Check if Departure Airport is within character range
        errorCounts += checkLength(flightData, validReqs, "departure_airport", "departure_airportError") ? 1 : 0;

        // Check if Arrival Airport is within character range
        errorCounts += checkLength(flightData, validReqs, "arrival_airport", "arrival_airportError") ? 1 : 0;

        // Check if airports are same
        errorCounts += checkSameAirport(flightData, validReqs, "departure_airport", "arrival_airport", "sameAirportError") ? 1 : 0;

        //Check if Departure Date is valid
        errorCounts += checkDateLength(flightData, validReqs, "departure_date", "departure_dateError") ? 1 : 0;

        //Check if Return Date is valid
        errorCounts += checkDateLength(flightData, validReqs, "return_date", "return_dateError") ? 1 : 0;

        // Convert date strings to Date
        // Check if Departure Date is after Return Date
        errorCounts += checkSameDepartureArrivalDate(flightData, validReqs, "departure_date", "return_date", "datesError") ? 1 : 0;

        return { validReqs, errorCounts };
    }

}
/* Global space */

const ERROR_MESSAGES = {
    idExists: "This id already exists. Try again.",
    idError: "Enter between 1 and 9999",
    flight_noError: "Enter between 5-10 characters",
    airlineError: "Enter between 2-25 characters",
    departure_airportError: "Enter between 2-5 characters",
    arrival_airportError: "Enter between 2-5 characters",
    sameAirportError: "Arrival airport cannot be the same as Departure airport",
    departure_dateError: "Departure Date is required",
    return_dateError: "Return Date is required",
    datesError: 'Return Date cannot be earlier than Departure Date'
}

// Check if string length    
const checkLength = (data, validReqs, key, errKey) => {
    if (data[key].length < validReqs[key].min) {
        validReqs[key].error = ERROR_MESSAGES[errKey];
        return true;
    }
    return false;
}

//Check if Date is valid
const checkDateLength = (data, validReqs, key, errKey) => {
    if (data[key].length === 0) {
        validReqs[key].error = ERROR_MESSAGES[errKey];
        return true;
    }
    return false;
}

//Check if airports are the same
const checkSameAirport = (data, validReqs, depart, arrive, errKey) => {
    if (data[depart] !== '' && data[depart] === data[arrive]) {
        validReqs[errKey] = ERROR_MESSAGES[errKey];
        return true;
    }
    return false;
}

//Check if same departure and arrival time
const checkSameDepartureArrivalDate = (data, validReqs, depart, arrive, errKey) => {
    if (new Date(data[depart]) > new Date(data[arrive])) {
        validReqs[errKey] = ERROR_MESSAGES[errKey];
        return true;
    }
    return false;
}

export default AddFlight;

// import React from 'react';
// import FlightForm from './FlightForm';

// export default class AddFlight extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = this.initState();
//   }

//   errorCounts = 0; // Form control error flag
//   submitted = false; // successful form submission flag

//   validReqs = {
//     id: { required: true, /* no duplicates */ errMsg: 'This id already exists. Try again.', errTaken: '', error: false },
//     airline: { required: true, min: 2, max: 25, errMsg: 'Enter between 2-25 characters', error: false },
//     flight_no: { required: true, min: 5, max: 10, errMsg: 'Enter between 5-10 characters', error: false },
//     trip_type: { required: true, errMsg: '' },
//     departure_airport: { required: true, min: 2, max: 25, errMsg: 'Enter between 2-25 characters', error: false },
//     arrival_airport: { required: true, min: 2, max: 5, errMsg: 'Enter between 2-5 characters', error: false },
//     departure_date: { required: true, errMsg: 'Return Date is required', errPastDate: '', error: false },
//     return_date: { required: true, errMsg: 'Return Date is required', errPastDate: '', error: false },
//     error: false
//   }

//   initState = () => {
//     const stateData = { id: 0, airline: '', flight_no: '', trip_type: '', departure_airport: '', arrival_airport: '', departure_date: '', return_date: '' };
//     const validReqs = {
//       id: { required: true, /* no duplicates */ errMsg: 'This id already exists. Try again.', errTaken: '', error: false },
//       airline: { required: true, min: 2, max: 25, errMsg: 'Enter between 2-25 characters', error: false },
//       flight_no: { required: true, min: 5, max: 10, errMsg: 'Enter between 5-10 characters', error: false },
//       trip_type: { required: true, errMsg: '' },
//       departure_airport: { required: true, min: 2, max: 25, errMsg: 'Enter between 2-25 characters', error: false },
//       arrival_airport: { required: true, min: 2, max: 5, errMsg: 'Enter between 2-5 characters', error: false },
//       departure_date: { required: true, errMsg: 'Return Date is required', errPastDate: '', error: false },
//       return_date: { required: true, errMsg: 'Return Date is required', errPastDate: '', error: false },
//       error: false
//     }

//     return { stateData, validReqs }
//   }

//   // event handler
//   handleChange = (e) => {
//     // Update the corresponding state property when an input changes
//     // validate
//     let field = e.target.name
//     if (field == 'flight_no') {
//       if (field.length < 5 || field.length > 10) {
//         // this.state.validReqs.flight_no.error = true
//       } else {
//         // this.state.validReqs.flight_no.error = false
//       }
//     };
//     this.setState({ [e.target.name]: e.target.value });

//   }

//   handleSubmit = (e) => {
//     e.preventDefault();
//     // perhaps this will let me fill in new data -- it worked!
//     const { id, airline, flight_no, trip_type, departure_airport, arrival_airport, departure_date, return_date } = this.state;
//     // this.state = ( this.initState() );
//     const newFlightData = {
//       id,
//       airline,
//       flight_no,
//       trip_type,
//       departure_airport,
//       arrival_airport,
//       departure_date,
//       return_date
//     };

//     // Call the parent's addFlight function to add the new flight data
//     console.log(newFlightData);
//     // pass up the data to app.js
//     this.props.addFlight(newFlightData);

//     // Reset the form fields
//     this.setState({
//       id: '',
//       airline: '',
//       flight_no: '',
//       trip_type: '',
//       departure_airport: '',
//       arrival_airport: '',
//       departure_date: '',
//       return_date: '',
//     });
//   };

//   validateForm = () => {
//     const gData = this.props.data;
//     const data = this.state.data;
//     const validReqs = this.state.validReqs;
//     // reset it everytime
//     validReqs.error = false;

//     // validate id
//     const newID = gData.map(obj => obj.id);
//     if (newID.includes(data.id)) {
//       validReqs.id.errTaken = "Id already taken.";
//       validReqs.error = true;
//     } else {
//       validReqs.newID.errTaken = '';
//     }

//     // validate airline
//     if (data.airline.length < validReqs.airline.min || data.airline.length > validReqs.airline.max) {
//       validReqs.airline.errMsg = `Must be between ${validReqs.airline.min} and ${validReqs.airline.max}`;
//       validReqs.error = true;
//     } else {
//       validReqs.airline.errMsg = '';
//     }
//   }

//   render() {

    

//   }
// }






// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function AddFlight(props) {
//   // react-hook-form functions
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     props.addFlight(data);
//   }

//   function isValid(field1, data, field2 = null) {
//           // return (
//           //   validReqs[field1].error || validReqs[field2]
//           //     ? "form-control is-invalid"
//           //     : "form-control"
//           // )
//           if (.flight_no.length < 5){
//             return "form-control is-invalid"
//           }
//           return "form-control"
//         }


//     return (
//       <div className="container">
//         <br />
//         <h1 className="text-left">Add Flight Schedule</h1>
//         <br />
//         <div className="border p-4 bg-light">
//           <p className="text-left font-weight-bold">Active Flight Schedule</p>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="row">
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="id">Id:</label>
//                 <input
//                   type="number"
//                   name="id"
//                   placeholder="No."
//                   className="form-control"
//                   {...register("id", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="no">Flight No:</label>
//                 <input
//                   type="text"
//                   name="flight_no"
//                   placeholder="Flight Number"
//                   className={isValid('flight_no')}
//                   {...register("flight_no", { required: 'This field is required' })}
//                 />
//                 {errors.flight_no && <p>{errors.flight_no.message}</p>}
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="airline">Airline:</label>
//                 <input
//                   type="text"
//                   name="airline"
//                   placeholder="Airline"
//                   className="form-control"
//                   {...register("airline", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="type">Trip Type:</label>
//                 <input type="text"
//                   name="trip_type"
//                   placeholder="Trip Type"
//                   className="form-control"
//                   {...register("trip_type", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="Departure">Departure Airport</label>
//                 <input
//                   type="text"
//                   name="departure_airport"
//                   placeholder="Departure Airline"
//                   className="form-control"
//                   {...register("departure_airport", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="arrival">Arrival Airport:</label>
//                 <input
//                   type="text"
//                   name="arrival_airport"
//                   placeholder="Arrival Airline"
//                   className="form-control"
//                   {...register("arrival_airport", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="depart_date">Departure Date:</label>
//                 <input
//                   type="date"
//                   name="departure_date"
//                   placeholder="Depart Date"
//                   className="form-control"
//                   {...register("departure_date", { required: 'This field is required' })}
//                 />
//               </div>
//               <div className="form-group col-md-4">
//                 <br />
//                 <label for="arrival_date">Return Date:</label>
//                 <input
//                   type="date"
//                   name="return_date"
//                   placeholder="Return Date"
//                   className="form-control"
//                   {...register("return_date", { required: 'This field is required' })}
//                 />
//               </div>
//               <br />
//               <br />
//             </div>
//             <br />
//             <button type="submit" class="btn btn-primary">Submit</button>
//           </form>
//           <br />
//         </div>
//       </div>
//     );
//   }
