import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

/**
 * CardTitle component for displaying a card header/title.
 * @param {*} props - The props for CardTitle.
 * @param {React.ReactNode} [props.title] - The title to display. If not provided, children will be used.
 * @param {object} [props.style] - Optional style overrides for the Typography component.
 * @param {React.ReactNode} [props.children] - Optional children to display instead of title.
 */
const CardTitle = ({ title, style, children }) => {
  const theme = useTheme();
  return (
    <>
      <Typography
        variant="h1"
        //fontWeight={700}
        fontSize={'24px'}
        fontFamily={theme.typography?.h1_fontFamily}
        //gutterBottom
        sx={{ mb: '1px', color: theme.palette.text.primary, ...style }}
        className="font-semibold"
      >
        {title || children}
      </Typography>

    </>
  );
};

CardTitle.propTypes = {
  style: PropTypes.object,
  title: PropTypes.node,
  children: PropTypes.node,
};

CardTitle.defaultProps = {
  title: null,
  style: null,
};

export default CardTitle;
