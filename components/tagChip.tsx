import { useState } from "react";
import { Tag } from "../models";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faSolarPanel, faRecycle, faLocationPin, faTruck, faLightbulb, faPeopleGroup, faGraduationCap, faScaleBalanced, faSeedling, faWheatAwn, faUniversalAccess } from "@fortawesome/free-solid-svg-icons"
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const tagIcons: {[key: string]: IconDefinition} = {
  'circular': faRecycle,
  'local': faLocationPin,
  'renewable': faSolarPanel,
  'truck': faTruck,
  'idea': faLightbulb,
  'community': faPeopleGroup,
  'learn': faGraduationCap,
  'fair-trade': faScaleBalanced,
  'vegan': faSeedling,
  'organic': faWheatAwn,
  'diversity': faUniversalAccess
}

export default function TagChip({tag, tiny=false}: {tag: Tag, tiny?: boolean}) {
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | HTMLButtonElement | null>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
  
    return (
      <div>
        { tiny ? (
          <Tooltip title={tag.name}>
            <IconButton onClick={handleClick} color={"secondary"}><FontAwesomeIcon icon={tagIcons[tag.icon]} width={16} height={16} /></IconButton>
          </Tooltip>
        ) : (
          <Chip icon={<FontAwesomeIcon style={{marginLeft: "8px"}} icon={tagIcons[tag.icon]}  width={14} height={14} />} label={tag.name} onClick={handleClick} color={"primary"} />
        ) }
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          slotProps={{
            paper: {style: { width: '100%' }},
          }}
          sx={{maxWidth: "500px"}}
        >
          <Typography sx={{ p: 2, fontSize: "0.8rem" }}>{tag.description}</Typography>
        </Popover>
      </div>
    );
  }