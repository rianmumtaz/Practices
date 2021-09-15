import PropTypes from "prop-types";
import Button from "./Button";

function Header({ title, toggleForm, addForm }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        onClick={toggleForm}
        text={addForm ? "Close" : "Add"}
        bgColor={addForm ? "red" : "green"}
      />
    </header>
  );
}

Header.defaulProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
