import React from "react";

const Detail = ({ title, name, optional }) => {
  return (
    <h1 className={`details ${title}`}>
      {name}
      {optional && (
        <span style={{ color: "#b97fc9", marginLeft: "5px" }}>{optional}</span>
      )}
    </h1>
  );
};

export default Detail;
