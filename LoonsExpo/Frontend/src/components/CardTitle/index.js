import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Title from '../Title';

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
      <Title title={title||children} style={style} />
      {/* <Divider /> */}
      <div style={{ width: '100%', height: 1, background: theme.palette.primary.main, borderRadius: 2, marginBottom: 16 }} className="main-title-underline"></div>
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
