const Button = ({ type, className, onClick, text }) => {
  return (
    <button
      type={type}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  className: "btn btn-primary",
  text: "Button",
};

export default Button;
