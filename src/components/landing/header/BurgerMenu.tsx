import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import styles from "./header.module.css";

export default function BurgerMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        color="inherit"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ height: 64, width: 64 }}
      >
        <MenuIcon width={64} height={64} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link className={`${styles.ctaLink}`} href="/create" key={0}>
            Create
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={`${styles.ctaLink}`} href="/feed" key={1}>
            Feed
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link className={`${styles.ctaLink}`} href="/discover" key={2}>
            Discover
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
