const Toast = ({ state, dispatch }) => {
  return (
    <div className="position-fixed top-60px end-0 p-3">
      <div className={state.body} data-bs-autohide="false" role="alert">
        <div className="d-flex">
          <div className={state.textColor}>{state.text}</div>
          <button
            type="button"
            className={state.btn}
            onClick={() => {
              dispatch({ type: "close" });
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
