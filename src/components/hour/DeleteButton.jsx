import React from 'react';
import PropTypes from 'prop-types';
import './deleteButton.scss';

const DeleteButton = ({ onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <>
      (
      <button
        className="delete-event-btn"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        Delete
      </button>
      )
    </>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
};

export default DeleteButton;
