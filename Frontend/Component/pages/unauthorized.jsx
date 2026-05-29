import React from "react";

const unauthorized = () => {
  return (
    <>
      <div className="UnauthorizedMain">
        <div  className="UnauthorizedMainInside">
          <h2>You are not authenticated</h2>
          <p>Please <a href="/login">login</a> to access this page.</p>
        </div>
      </div>
    </>
  );
};

export default unauthorized;
