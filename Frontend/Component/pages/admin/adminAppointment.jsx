import React from 'react'

const adminAppointment = () => {
  return (
<>
<div className='adminAppointmentMain'>
    <div className='VisitorDetails'>
          <div className="UserAdd">
            <button
              onClick={() =>
                window.open("http://localhost:5173/register", "_self")
              }
            >
              <img src="\public\edit.png" alt="" />
              Create Visitor
            </button>
          </div>
           {/* <div className="UserInfo">
            <div className="UserSearch">
              <p>No</p>
              <input
                type="text"
                placeholder="UserName"
                value={searchname}
                onChange={(e) => setsearchname(e.target.value)}
              />
              <input
                type="text"
                placeholder="UserEmail"
                value={searchemail}
                onChange={(e) => setsearchemail(e.target.value)}
              />
              <input
                type="text"
                placeholder="UserRole"
                value={searchrole}
                onChange={(e) => setsearchrole(e.target.value)}
              />
              <p>Delete</p>
            </div>
            <div className="UserInfoBoxOuter">
              {Array.isArray(displayUser) &&
                displayUser.map((user, index) => (
                  <div className='UserInfoBox' key={user._id}>
                    <p className="p1">{index + 1}</p>
                    <p className="p2">{user.username}</p>
                    <p className="p3">{user.email}</p>
                    <p className="p4">{user.role}</p>
                    <p className="p5" onClick={() => handelDel(user._id, user.role)}>
                      <img src="/public/delete.png" alt="" />
                    </p>
                  </div>
                ))}
            </div>
          </div> */}
    </div>
</div>
</>
  )
}

export default adminAppointment