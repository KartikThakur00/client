import React from "react";
import "./employee.css";

function Employee() {
  const [data, setData] = React.useState({
    name: "",
    gender: "",
    from: "",
    to: "",
    phone: "",
    email: "",
  });
  const [file, setFile] = React.useState(null);
  const [msg, setMsg] = React.useState("");

  //handling change
  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  //handling file input
  function handleFileInput(e) {
    console.warn(e.target.files);
    const files = e.target.files[0];
    const size = files.size;
    const type = files.type;

    if (size > 5000000  ) {
      alert("file size can't exceed 5 MB and Null ");
      return;
    }

    if (type !== "application/pdf" && type !== "image/png") {
      alert("only .pdf and .png extension ");
      return;
    }

    setFile((prev) => files);
  }

  //handling the submit
  function handleSubmit(e) {
    e.preventDefault();

    if (file ==null  ) {
      alert("file  can't be Null ");
      return;
    }

    const f = new Date(data.from);
    const t = new Date(data.to);
    if (f > t) {
      setMsg((prev) => "To date should be greater than From date");
      return;
    }

    const number = /^(\+?91[\s]?)?[6789]\d{9}$/;

    if (!number.test(data.phone)) {
      setMsg((prev) => "enter a valid number <+91 1234567891>");
      return;
    }

    const mail =
      /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!mail.test(data.email)) {
      setMsg((prev) => "enter a valid mail");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name.trim());
    formData.append("gender", data.gender);
    formData.append("from", data.from);
    formData.append("to", data.to);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("file", file);
    // console.log(formData.get("name"));
    // console.log(formData.get("gender"));
    // console.log(formData.get("from"));
    // console.log(formData.get("to"));
    // console.log(formData.get("phone"));
    // console.log(formData.get("email"));
    // console.log(formData.get("file"));
    fetch("/api", {
      method: "POST",
      body: formData,
    })
      .then((res) => alert("Details Submitted"))
      .catch((err) => console.log(err));
    setMsg("");
    setData({
      name: "",
      gender: "",
      from: "",
      to: "",
      phone: "",
      email: "",
    });
    setFile(null);
  }

  // console.log(data);
  return (
    <div className="container-form">
      <form onSubmit={handleSubmit} className="form">
        <div className="name-gender">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            maxLength="30"
            value={data.name}
            onChange={handleChange}
            required
            className="input-name"
          />
          <select
            name="gender"
            value={data.gender}
            onChange={handleChange}
            className="input-gender"
            required
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="date">
          <input
            type="date"
            name="from"
            value={data.from}
            onChange={handleChange}
            className="input-date from"
            required
          />
          <input
            type="date"
            name="to"
            placeholder="To"
            value={data.to}
            onChange={handleChange}
            className="input-date to"
            required
          />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone No. +91 12345 12456"
          minLength="10"
          maxLength="14"
          pattern="^(\+?91[\-\s]?)?[6789]\d{9}"
          value={data.phone}
          onChange={handleChange}
          className="input-phone"
          required
        />
        <input
          type="file"
          name="resume"
          accept=".pdf, .png"
          onChange={handleFileInput}
          className="input-file"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="input-mail"
          required
        />
        <input type="submit" value="Submit" className="submit" />
        <div className="msg">
          <span className="error">{msg}</span>
        </div>
      </form>
    </div>
  );
}

export default Employee;
