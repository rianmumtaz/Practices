import PropTypes from "prop-types";

function Button({ text, bgColor, onClick }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="btn"
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: "Button",
  bgColor: "black",
};

Button.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
