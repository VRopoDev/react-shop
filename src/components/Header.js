import PropTypes from "prop-types";
import Button from "./Button";
import logo_vitl from "../content/vitl_logo.svg";

const Header = ({ title, onShow, opened }) => {
  return (
    <header className="header">
      <img className="logo" src={logo_vitl} alt={"vitl logo"} />
      <Button
        color={opened ? "red" : "grey"}
        text={opened ? "Close" : "Basket"}
        onClick={onShow}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Vitl Shop",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
