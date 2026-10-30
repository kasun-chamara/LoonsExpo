import React, { useEffect, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/material/styles';
import Title from '../Title';
import { Divider } from '@mui/material';

const StyledChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
  },
  '& .MuiChip-label': {
    color: theme.palette.primary.main,
  },
}));

const CollapsibleSection = ({
  children,
  title,
  buttonText = 'Expand',
  collapsTrigger = false,
  underLineVisible = true,
  showButton = true,
}) => {
  const [open, setOpen] = useState(collapsTrigger);

  const handleToggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    setOpen(collapsTrigger);
  }, [collapsTrigger]);

  return (
    <Box width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Title title={title} />
        {showButton && (
          <StyledChip
            label={buttonText}
            onClick={handleToggle}
            icon={open ? <ExpandLess /> : <ExpandMore />}
            variant="outlined"
            size="medium"
          />
        )}
      </Box>
      {underLineVisible && (
        <Divider sx={{ width: '100%',  my: 1 }} />
      )}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box>
          {children}
        </Box>
        <Divider sx={{ width: '100%',  my: 2 }} />
      </Collapse>
    </Box>
  );
};

export default CollapsibleSection;
