const DestinasiQuery = ({
  searchDestinations,
  setName,
  setDomestic,
  setSort,
}) => {
  const changeDomestic = (e) => {
    setDomestic(e.target.value);
  };

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeSort = (e) => {
    setSort(e.target.value);
  };

  const onSearchClick = () => {
    searchDestinations();
  };

  return (
    <>
      <h1 className="my-5">Destination</h1>
      <div className="row justify-content-center align-items-center">
        <div className="col-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={changeName}
          />
        </div>
        <div className="col-2">
          <select className="form-select" onChange={changeDomestic}>
            <option value="all">All Catgory</option>
            <option value="domestic">Domestic</option>
            <option value="nondomestic">Non Domestic</option>
          </select>
        </div>
        <div className="col-2">
          <select className="form-select" onChange={changeSort}>
            <option value="1">Asc</option>
            <option value="-1">Desc</option>
          </select>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSearchClick}
          >
            Search
          </button>
        </div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#myModal"
          >
            Tambah Destinasi
          </button>
        </div>
      </div>
    </>
  );
};

export default DestinasiQuery;
