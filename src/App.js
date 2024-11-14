import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './components/Home';
import AddFlight from './components/AddFlight';
import EditFlight from './components/EditFlight';
import About from './components/About';
import FlightList from './components/FlightList';
import NavData from './models/NavData';
import FlightData from './models/flight-data';
// const cors = require('cors')

// this is the 'source'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialize the state data, subject to change
    this.state = { navData: NavData, flightData: FlightData, showTable: false, buttonText: 'Show Flight Table', showForm: false };
    this.addFlight = this.addFlight.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
    this.deleteFlight = this.deleteFlight.bind(this);
    this.deleteAll = this.deleteAll.bind(this);
  }


  // this is the 'view'
  render() {

    const Wrapper = (props) => {
      const { params } = useParams();
      //  ... = spread operator
      return <EditFlight flightData={this.state.flightData} updateFlight={this.updateFlight} {...{...props, 
      match: {...params}} } />
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Nav navData={this.state.navData} />
          <Routes>

            <Route path="/edit/:id" element={<Wrapper />} />

            <Route path="/flights" element={
              <FlightList title="Flight Schedule" flightData={this.state.flightData} deleteFlight={this.deleteFlight} deleteAll={this.deleteAll} handleShowForm={this.handleShowForm} />} />

            <Route path="/add" element={
              <AddFlight flightData={this.state.flightData} addFlight={this.addFlight} handleShowForm={this.handleShowForm} />} />

            <Route path="/edit/:id" element={
              <EditFlight flightData={this.state.flightData} updateFlight={this.updateFlight} />} />

            <Route path="/about" element={
              <About title="About the flight app" />}>
            </Route>

            <Route path="/" element={
              <Home />} />

            <Route path="/Home" element={
              <Home title="Home of the flight app" />} />

          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }



  /////////////////////////////////////////////////////////////////////
  // CRUD OPERATIONS
  ////////////////////////////////////////////////////////////////////

  api_url = "https://prometheus.gtc.edu/~hurc/api/flights/index.php/"

  // get method
  fetchFlights = () => {
    fetch(this.api_url)
    .then( resolve=>resolve.json())
    .then(data =>{
      this.setState({flightData : data });
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Add flight
  addFlight = (newFlight) => {
    // Send post request to server to add flight
    fetch(this.api_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFlight),
    })
      .then(response => response.json())
      .then(data => {
        // Update the state with the updated flight data
        this.setState(prevState => ({
          flightData: [...prevState.flightData, data],
        }));
      })
      .catch(error => {
        console.error('Error adding flight:', error)
      });
      
    let FlightData = this.state.flightData;
    FlightData.push(newFlight);
    // changes/updates the state data
    this.setState({ FlightData });
  }


  // Update flight
  updateFlight = (index, updatedFlightData) => {
    fetch(this.api_url, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFlightData),
    })
      .then(response => {
        if(response.ok){
          this.fetchFlights();
        } else {
          console.error('Error updating flight', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error updating flight', error);
      });

    const flightData = this.state.flightData;
    flightData[index] = updatedFlightData;
    // changes/updates the state data
    this.setState({ flightData })
  }


  // Delete flight
  deleteFlight = (id) => {
    fetch(`${this.api_url}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok){
          this.fetchFlights();
        } else {
          console.error('Error deleting flight:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error deleting flight:', error);
      });
    
    // Local update
    let temp = this.state.flightData;
    let index = temp.findIndex(flight => flight.id == id);
    temp.splice(index, 1);
    // changes/updates the state data
    this.setState({ flightData: temp });
    console.log(id);
  }

  deleteAll = () => {
    // TO-DO
  }
}






// addFlight = (newFlight) => {
//   let FlightData = this.state.flightData;
//   FlightData.push(newFlight);
//   // changes/updates the state data
//   this.setState({ FlightData });
// }

// updateFlight = (index, updatedFlightData) => {
//   const flightData = this.state.flightData;
//   flightData[index] = updatedFlightData;
//   // changes/updates the state data
//   this.setState({ flightData })
// }

// deleteFlight(id) {
//   let temp = this.state.flightData;
//   let index = temp.findIndex(flight => flight.id == id);
//   temp.splice(index, 1);
//   // changes/updates the state data
//   this.setState({ flightData: temp });
//   console.log(id);
// }

// deleteAll = () => {
//   // TO-DO
// }