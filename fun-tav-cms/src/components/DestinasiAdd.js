const DestinasiAdd = () => {
  return (
    <div className="modal fade" tabIndex="-1" id="myModal">
      <div className="modal-dialog show">
        <div className="modal-content show">
          <div className="modal-header">
            <h5 className="modal-title">Tambah Destinasi</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Nama Destinasi</label>
            <input type="text" className="form-control mb-3" />
            <label className="form-label">Kategori Destinasi</label>
            <select className="form-select mb-3">
              <option value="domestic">Domestic</option>
              <option value="nondomestic">Non Domestic</option>
            </select>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinasiAdd;
