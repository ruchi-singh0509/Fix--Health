import React from "react";
import AppointmentForm from "../components/AppointmentForm.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";

function Appointment() {
  return (
    <>
      <Navbar />
      <AppointmentForm />
      <Footer />
    </>
  );
}

export default Appointment;
