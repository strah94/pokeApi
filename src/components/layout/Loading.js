import React, { Fragment } from "react";
import spinner from "../../assets/images/spinner.gif";

const Loading = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        alt="Loading..."
        style={{
          width: "200px",
          height: "200px",
          margin: "auto",
          display: "block",
        }}
      />
    </Fragment>
  );
};

export default Loading;
