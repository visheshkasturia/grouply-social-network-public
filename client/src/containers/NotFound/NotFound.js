import React from 'react';
import './NotFound.css';
import c3pogif from '../../static/c3poomg.gif';

function NotFound() {
  return (
    <div className="not-found">
      <img data-testid="img-nf-test" className="img-gif" src={c3pogif} alt="Oh my goodness GIF" />
      <h1 data-testid="h1-nf-test" className="h1-nf">Looks like something went wrong and you landed in the wrong place . Quick try again!.</h1>
    </div>
  );
}

export default NotFound;
