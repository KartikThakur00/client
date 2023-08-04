import React, { useState, useEffect } from "react";
import "./employee.css";

function Employee() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);

  function handleClick(path) {
    console.log(path);
  }
  console.log(data);

  return (
    <div className="container-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Phone Number</th>
            <th>File</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key}>
                <td>{val.name}</td>
                <td>{val.gender}</td>
                <td>{val.from ? val.from.slice(0, 10 ) : ""}</td>
                <td>{val.to ? val.to.slice(0, 10) : ""}</td>
                <td>{val.phone}</td>
                <td>
                  <a href={`http://localhost:8080/api/${val.resume}`}  download >
                    <button onClick={() => handleClick(val.resume)}>
                      resume
                    </button>
                  </a>
                </td>
                <td>{val.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Employee;
