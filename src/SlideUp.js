import React, { useState } from "react";
import "./SlideUp.css";
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';

export default function SlideUp() {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <div className="slideUpPanel">

      {/* modal with button */}
      <div className={`modal ${displayModal ? "show" : ""}`} onClick={() => setDisplayModal(!displayModal)}> 
        
        <div><ExpandLessRoundedIcon /></div>

        <div className="text">
          <p>Some dummy text about the about and the search and something else</p>
        </div>

      </div>
      <div
        className={`overlay ${displayModal ? "show" : ""}`}
        onClick={() => setDisplayModal(!displayModal)}
      />

    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<SlideUp />, rootElement);
