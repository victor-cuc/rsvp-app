import React, { Component } from 'react';
import { request } from 'graphql-request';
import './App.css';

import Header from './Header'
import MainComponent from './MainComponent'

class App extends Component {

  state = {
    isFiltered: false,
    pendingGuest: "",
    guests: []
  }

  lastGuestId = 0;

  componentWillMount() {
    const query = `query {
      guests {
        id
        name
        isConfirmed
      }
    }`

    request("http://localhost:4466/", query).then((response) => {
      console.log(response);
      this.setState({
        ...this.state,
        guests: response.guests.map((guest) => ({
          ...guest,
          isEditing: false
        }))
      });
    })
  }

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId++;
    return id;
  };

  // Parantezele drepte?
  toggleGuestPropertyAt = (property, id) =>
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) { // Ce se intampla aici? Nu inteleg cum poate sa nu gaseasca index-ul
          return {
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = id =>
    this.toggleGuestPropertyAt("isConfirmed", id);

  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    });

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id);

  setNameAt = (name, id) =>
    this.setState({
      guests: this.state.guests.map((guest) => {
        if (id === guest.id) { // Ce se intampla aici? Nu inteleg cum poate sa nu gaseasca index-ul
          return {
            ...guest,
            name
          };
        }
        return guest;
      })
    });

  //justName = () => this.state.guests.map((guest) => {name: guest.name})

  toggleFilter = () =>
    this.setState({ isFiltered: !this.state.isFiltered })

  handleNameInput = e =>
    this.setState({ pendingGuest: e.target.value })

  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id = this.newGuestId();
    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id,
        },
        ...this.state.guests,
      ],
      pendingGuest: ""
    });
  }

  getTotalInvited = () => this.state.guests.length;

  getAttendingGuests = () =>
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total,
      0
    );

  render() {
    const totalInvited = this.getTotalInvited();
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <Header
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          handleNameInput={this.handleNameInput}
          pendingGuest={this.state.pendingGuest} />
        <MainComponent
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
        />
      </div>
    );
  }
}

export default App;
