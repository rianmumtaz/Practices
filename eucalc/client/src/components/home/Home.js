import { useState } from "react";
import ContactMe from "./ContactMe";

const Home = () => {
  const [sent, setSent] = useState(false);
  const [succ, setSucc] = useState(false);
  return (
    <>
      <section className="bg-primary p-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col d-none d-md-block">
              <img className="w-75 img-fluid" src="img/logo.png" alt="" />
            </div>
            <div className="col text-md-end text-center text-light lead">
              <h2 className="mb-4">
                EUCALC{" "}
                <span className="text-warning">
                  Solar Water Heater Calculator
                </span>
              </h2>
              <p>
                Designed to simulate a simple solar water heating system for
                both residential and commercial use. It requires an input of
                monthly meteorological data, solar water heating system
                configuration, solar collector model, and load profile to obtain
                monthly solar fraction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-5 bg-dark text-light">
        <div className="container">
          <h1 className="text-center text-warning">Meteorological Data</h1>
          <div className="row align-items-center g-5">
            <div className="col-md lead text-md-end text-center">
              <p>
                In terms of estimating solar water heating efficiency, we need
                to know how much solar irradiation that received in the tested
                location. With the meteorological data derived from NASA
                Prediction Of Worldwide Energy Resources, EUCALC can calculate
                how much solar energy that can be harnessed by a solar collector
                in a certain location.
              </p>
            </div>
            <div className="col-md">
              <img src="img/location.svg" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-secondary p-5 text-light">
        <div className="container">
          <h1 className="text-center text-warning">Solar Collector</h1>
          <div className="row align-items-center g-5">
            <div className="col-md p-5">
              <img
                src="img/solarPanel.jpg"
                className="img-fluid rounded-circle opacity-75"
                alt=""
              />
            </div>
            <div className="col-md lead text-md-end text-center">
              <p>
                EUCALC uses the f-chart method in order to calculate the monthly
                solar fraction. The calculation results is more suitable for
                standard-active-direct solar water heating system.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="p-5 bg-dark text-light">
        <div className="container">
          <h1 className="text-center text-warning">Load</h1>
          <div className="row align-items-center g-5">
            <div className="col-md lead text-md-end text-center">
              <p>
                EUCALC needs the information about how much hot water that being
                used to calculate the performance of the solar heating system.
                It depends on the volume of water and the temperature of the
                water that will be consumed.
              </p>
            </div>
            <div className="col-md">
              <img src="img/load.svg" className="img-fluid" alt="" />
            </div>
          </div>
        </div>
      </section>
      <div
        className="position-fixed mt-5 top-0 end-0 p-3"
        style={{ zIndex: 11 }}
      >
        <div
          className={
            sent
              ? succ
                ? "toast text-white bg-success show"
                : "toast text-white bg-danger show"
              : "toast"
          }
          role="alert"
        >
          <div className="d-flex align-items-center">
            <div className="toast-body">
              {succ
                ? "Thank you, I will contact you back soon..."
                : "Something went wrong. Try again later..."}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              onClick={(e) => {
                setSent(false);
              }}
            ></button>
          </div>
        </div>
      </div>
      <ContactMe setSent={setSent} setSucc={setSucc} />
      <footer className="p-5 bg-dark text-white text-center position-relative">
        <div className="container">
          <p className="lead">Copyright &copy; 2021 EUCALC</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
