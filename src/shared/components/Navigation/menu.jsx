import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import CustomMenuItem from './menuItem';

const BasicMenu = ({buttonLabel, options}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {options.map((option, index) => (
          <CustomMenuItem
            key={index}
            to={option.to}
            label={option.label}
            onClick={option.onClick}
          />
        ))}
      </Menu>
    </div>
  );
};

export default BasicMenu;
