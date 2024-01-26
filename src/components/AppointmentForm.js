import React, { useState, useEffect } from "react";
import "../Styles/AppointmentForm.css";
import { ToastContainer, toast } from "react-toastify";

import Select from "react-select";

function AppointmentForm() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  useEffect(() => {
    let paramString = document.location.href.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    for (let pair of queryString.entries()) {
      if (pair[0] === "city") {
        setCityParam(pair[1]);
        fetchDoctors(pair[1]);
      }
    }
  }, []);

  const [cityParam, setCityParam] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [chiefComplaints, setChiefComplaints] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const cityOptions = [
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bangalore", label: "Bangalore" },
    { value: "Delhi", label: "Delhi" },
    { value: "Nagpur", label: "Nagpur" },

  ];

  const fetchDoctors = (cityValue) =>
    fetch(`https://backend-fix-health.vercel.app//doctors/city/${cityValue}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const result = data.map((doc, index) => ({
          ...doc,
          value: index,
          label: `${doc.name}, ${doc.expertise}, ${doc.city}`,
        }));
        setAvailableDoctors(result);
      });

  const cityHandler = (cityObj) => {
    setCity(cityObj);

    if (cityParam === "") {
      fetchDoctors(cityObj.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }

    if (age === "") {
      errors.age = "Age is required";
    } else if (age < 0) {
      errors.age = "Age must be a positive number";
    }

    if (!city.trim()) {
      errors.city = "City is required";
    }

    if (!company.trim()) {
      errors.company = "Company is required";
    }

    if (!selectedDoctor.trim()) {
      errors.doctor = "doctor is required";
    }

    if (!chiefComplaints.trim()) {
      errors.chiefComplaints = "Chief complaints are required";
    }

    if (age >= 40 && !previousExperience.trim()) {
      errors.previousExperience =
        "Previous experience with physiotherapy is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setName("");
    setPhoneNumber("");
    setAge("");
    setCity("");
    setCompany("");
    setChiefComplaints("");
    setPreviousExperience("");
    setFormErrors({});

    toast.success("Appointment form submitted successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCityOverride = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const cityParam = urlParams.get("city");

    if (cityParam) {
      // Override city entered by patient with the city from urlParam
      setCity(cityParam);
    }
  };

  return (
    <div className="appointment-form-section">
      <div className="form-container">
        <h2 className="form-title">
          <span>Book Appointment Online</span>
        </h2>

        <form className="form-content" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              className="input-box"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {formErrors.name && (
              <p className="error-message">{formErrors.name}</p>
            )}
          </label>

          <br />
          <label>
            Phone Number:
            <input
              className="input-box"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            {formErrors.phoneNumber && (
              <p className="error-message">{formErrors.phoneNumber}</p>
            )}
          </label>

          <br />
          <label>
            Age:
            <input
              className="input-box"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
            {formErrors.age && (
              <p className="error-message">{formErrors.age}</p>
            )}
          </label>

          <br />
          <label>
            City:
            <Select
              required
              options={cityOptions}
              value={city}
              onChange={cityHandler}
            />
            {formErrors.city && (
              <p className="error-message">{formErrors.city}</p>
            )}
          </label>
          <br />
          <label>
            Doctors:
            <Select
              required
              options={availableDoctors}
              value={selectedDoctor}
              onChange={(doc) => setSelectedDoctor(doc)}
            />
            {formErrors.doctor && (
              <p className="error-message">{formErrors.doctor}</p>
            )}
          </label>
          <br />

          <label>
            Company:
            <input
              className="input-box"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            {formErrors.company && (
              <p className="error-message">{formErrors.company}</p>
            )}
          </label>

          <br />
          <label>
            Chief Complaints:
            <textarea
              value={chiefComplaints}
              onChange={(e) => setChiefComplaints(e.target.value)}
              required
            />
            {formErrors.chiefComplaints && (
              <p className="error-message">{formErrors.chiefComplaints}</p>
            )}
          </label>

          {age >= 40 && (
            <>
              <br />
              <label>
                Previous Experience with Physiotherapy:
                <textarea
                  value={previousExperience}
                  onChange={(e) => setPreviousExperience(e.target.value)}
                  required
                />
                {formErrors.previousExperience && (
                  <p className="error-message">
                    {formErrors.previousExperience}
                  </p>
                )}
              </label>
            </>
          )}

          <br />
          <button type="submit" className="text-appointment-btn">
            Confirm Appointment
          </button>

          <p className="success-message">
            Appointment details has been sent to the patients phone number via
            SMS.
          </p>
        </form>
      </div>

      <div className="legal-footer">
        <p>© 2023. FixHealth.com. All rights reserved.</p>
      </div>

      <ToastContainer autoClose={5000} limit={1} closeButton={false} />
    </div>
  );
}

export default AppointmentForm;
