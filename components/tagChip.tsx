import { useState, MouseEvent } from "react";
import { Tag } from "../models";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";

export default function TagChip({name, description}: {name: string, description: string}) {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        <Chip label={name} onClick={handleClick} color="primary" />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          sx={{maxWidth: 500}}
        >
          <Typography sx={{ p: 2, fontSize: "0.8rem" }}>{description}</Typography>
        </Popover>
      </div>
    );
  }