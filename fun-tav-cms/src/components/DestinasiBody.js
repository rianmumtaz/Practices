import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DestinasiBody = ({ destinations, size, showMore, firstRun }) => {
  const [body, setBody] = useState("");

  useEffect(() => {
    if (destinations.length > 0) {
      setBody(
        destinations.map((destination) => {
          return (
            <div key={destination._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{destination.place.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {destination.place.domestic ? "Domestic" : "Non Domestic"}
                </h6>
                <p className="card-text">
                  {destination.departures.length} Keberangkatan
                </p>
                <Link to="#" className="card-link">
                  Card link
                </Link>
                <Link to="#" className="card-link">
                  Another link
                </Link>
              </div>
            </div>
          );
        })
      );
    } else {
      if (firstRun.current) {
        setBody(
          <div className="row justify-content-center">
            <div className="col-auto">
              <p>Please search for destination</p>
            </div>
          </div>
        );
      } else {
        setBody(
          <div className="row justify-content-center">
            <div className="col-auto">
              <p>Data not found</p>
            </div>
          </div>
        );
      }
    }
  }, [destinations, firstRun]);

  return (
    <div className="container mt-5">
      {body}
      {destinations.length < parseInt(size.current) && (
        <div className="row justify-content-center">
          <div className="col-auto">
            <button
              className="btn btn-primary"
              onClick={() => {
                showMore();
              }}
            >
              Show More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinasiBody;
