import React from 'react';
import PropTypes from 'prop-types';

import Guest from './Guest';
import PendingGuest from './PendingGuest';

const GuestList = props =>
  <ul>
    <PendingGuest name={props.pendingGuest}/>
    {props.guests
      .filter(guest => !props.isFiltered || guest.isConfirmed)
      .map((guest, index) =>
      <Guest
        key={index}
        name={guest.name}
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing}
        handleConfirmation={() => props.toggleConfirmationAt(guest.id)}
        handleEditing={() => props.toggleEditingAt(guest.id)}
        setName={text => props.setNameAt(text, guest.id)}
        handleRemove={() => props.removeGuestAt(guest.id)} />
    )}
  </ul>;

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired,
}

// function types
/* const sum = (var1, var2) => var1 + var2;
const sum2 = (var1, var2) => {
  return var1 + var2;
}
const sum3 = function (var1, var2) {
  return var1 + var2;
}
function sum4(var1, var2) {
  return var1 + var2;
} */

export default GuestList;