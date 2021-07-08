import React from "react";
import Detail from "./Detail";

const Details = ({ title, detailArray, detailName, detailStat }) => {
  return (
    <div className="flex">
      <h1 className="details" style={{ backgroundColor: "#282c34" }}>
        {title.toUpperCase()}:
      </h1>
      {detailArray &&
        detailArray.map((e, index) => {
          {
            if (index <= 5)
              return (
                <Detail
                  title={title}
                  name={e[`${title}`].name}
                  optional={title === "stat" && e.base_stat}
                  key={index}
                />
              );
          }
        })}
    </div>
  );
};

export default Details;
