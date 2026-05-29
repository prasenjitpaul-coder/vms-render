import React from "react";

const admin = () => {
  return (
    <>
      <div className="AdminMain">
        <div className="AdminAnalizeBox">
          
        </div>
        <div className="AdminBox">
          <div className="AdminTaskBox">
            <p>Total Visitor</p>
            <img src="\public\travelling.png" alt="" />
            <h3>144</h3>
          </div>
          <div className="AdminTaskBox">
            <p>Total Employees</p>
            <img src="\public\employee.png" alt="" />
            <h3>22</h3>
          </div>
          <div className="AdminTaskBox">
            <p>Active Passes</p>
            <img src="\public\pass.png" alt="" />
            <h3>21</h3>
          </div>
          <div className="AdminTaskBox">
            <p>Logs / Reports</p>
            <img src="\public\report.png" alt="" />
            <h3>100</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default admin;
