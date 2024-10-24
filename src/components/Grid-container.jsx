import React from "react";

const GridContainer = ({ children }) => {
  return (
    <React.Fragment>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-col-1 place-items-center ml-6">
        {children}
      </div>
    </React.Fragment>
  );
};

export default GridContainer;
