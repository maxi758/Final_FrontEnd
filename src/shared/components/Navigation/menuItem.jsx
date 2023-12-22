import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

const CustomMenuItem = ({ label, to }) => (
  <MenuItem>
    <NavLink to={to}>{label}</NavLink>
  </MenuItem>
);

export default CustomMenuItem;