import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DestinasiBody from "./components/DestinasiBody";
import DestinasiQuery from "./components/DestinasiQuery";
import DestinasiAdd from "./components/DestinasiAdd";

const Destination = ({ dispatch }) => {
  const limit = useRef(2);
  const size = useRef(0);
  const firstRun = useRef(true);
  const [destinations, setDestinations] = useState([]);
  const [name, setName] = useState("");
  const [domestic, setDomestic] = useState("all");
  const [sort, setSort] = useState("1");

  const searchDestinations = () => {
    if (firstRun.current) {
      firstRun.current = false;
    }
    axios
      .get("http://localhost:5000/api/destination", {
        params: {
          name,
          domestic,
          sort,
          limit: limit.current,
        },
      })
      .then(function (response) {
        // handle success
        dispatch({ type: "success", msg: "Successfully fetch data" });
        setDestinations(response.data.destinations);
        size.current = response.data.size;
      })
      .catch(function () {
        // handle error
        dispatch({ type: "error", msg: "Failed to fetch data" });
      });
  };

  const showMore = () => {
    limit.current += 2;
    searchDestinations();
  };

  useEffect(() => {
    limit.current = 2;
  }, [name, domestic, sort]);

  return (
    <>
      <DestinasiAdd />
      <DestinasiQuery
        searchDestinations={searchDestinations}
        setName={setName}
        setDomestic={setDomestic}
        setSort={setSort}
      />
      <DestinasiBody
        destinations={destinations}
        size={size}
        showMore={showMore}
        firstRun={firstRun}
      />
    </>
  );
};

export default Destination;
