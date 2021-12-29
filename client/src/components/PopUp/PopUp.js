import React from 'react';
import './PopUp.css';

function PopUp(props) {
  const prop = props;
  return (
    <div>
      <div className="popup-box">
        <div className="box">
          {prop.content}
          <button data-testid="pop-close-test" type="button" className="close-btn" onClick={prop.handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
