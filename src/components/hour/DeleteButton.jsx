import React from 'react';
import PropTypes from 'prop-types';
import './deleteButton.scss';

const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete-event-btn" onClick={onClick}>
      Delete
    </button>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
