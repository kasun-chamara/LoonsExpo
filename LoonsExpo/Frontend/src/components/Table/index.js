/*
Loons Lab Table component
Developed By Roshan
Loons Lab
*/
import React, { useEffect, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import './tableCss.css';

/**
 * Table component using MUI DataGrid (community version).
 * Supports horizontal scroll and includes the toolbar.
 * Renders a message if columns are empty.
 * @param {object} props - The props for Table.
 * @param {string} [props.id] - The id for the table.
 * @param {Array} [props.columns] - The column definitions.
 * @param {Array} [props.data] - The table data.
 * @param {number} [props.height] - The height of the table.
 */
const Table = ({
  id = 'mui-table',
  columns = [],
  data = [],
  height = 400,
  ...props
}) => {
  const rows = data.map((row, idx) => ({ id: row.id ?? idx, ...row }));
  const gridRef = useRef();

  useEffect(() => {
    // Wait for DataGrid to render and find the virtual scroller
    const interval = setInterval(() => {
      const gridScroller = gridRef.current?.querySelector('.MuiDataGrid-virtualScroller');
      if (!gridScroller) return;
      clearInterval(interval);

      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      const onMouseDown = (e) => {
        isDragging = true;
        startX = e.pageX - gridScroller.offsetLeft;
        scrollLeft = gridScroller.scrollLeft;
        gridScroller.classList.add('dragging');
      };
      const onMouseLeave = () => {
        isDragging = false;
        gridScroller.classList.remove('dragging');
      };
      const onMouseUp = () => {
        isDragging = false;
        gridScroller.classList.remove('dragging');
      };
      const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - gridScroller.offsetLeft;
        const walk = (x - startX) * 1.2;
        gridScroller.scrollLeft = scrollLeft - walk;
      };

      gridScroller.addEventListener('mousedown', onMouseDown);
      gridScroller.addEventListener('mouseleave', onMouseLeave);
      gridScroller.addEventListener('mouseup', onMouseUp);
      gridScroller.addEventListener('mousemove', onMouseMove);

      // Cleanup
      return () => {
        gridScroller.removeEventListener('mousedown', onMouseDown);
        gridScroller.removeEventListener('mouseleave', onMouseLeave);
        gridScroller.removeEventListener('mouseup', onMouseUp);
        gridScroller.removeEventListener('mousemove', onMouseMove);
      };
    }, 100);

    return () => clearInterval(interval);
  }, [columns, data]);

  if (!columns || columns.length === 0 || !data || data.length === 0) {
    return null;
  }

  return (
    <div
      ref={gridRef}
      id={id + '-outer'}
      className="loons-table-scroll grabbable"
      style={{ width: '100%', minHeight: height, height, overflowX: 'auto', cursor: 'grab' }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        autoHeight={false}
        disableColumnMenu={false}
        disableSelectionOnClick
        {...props}
      />
    </div>
  );
};

export default Table;
