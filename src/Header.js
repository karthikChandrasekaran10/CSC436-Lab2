import React from "react";
import {ThemeContext} from "./Context";
import { useContext } from "react";
const Header = ({ text }) => {
//   <ThemeContext.Consumer>
//     {(theme) => <h1 style={{ color: theme.primary}}>{text}</h1>}
//   </ThemeContext.Consumer>
const theme = useContext(ThemeContext);
return <h1 style={{ color: theme.primaryColor }}>{text}</h1>;
};
export default Header;
