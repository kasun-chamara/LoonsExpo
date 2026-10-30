//https://www.material-react-table.com/
import React, { useRef, useState, useCallback } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useTheme, darken, useMediaQuery } from '@mui/material';

// Custom hook for horizontal drag scrolling
const useDragScroll = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
    containerRef.current.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.userSelect = 'auto';
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.userSelect = 'auto';
    }
  }, []);

  return {
    containerRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  };
};

//https://www.material-react-table.com/docs/api/table-options
/**
 * MuiTable - A reusable Material React Table component with mobile responsiveness and drag scrolling
 * @param {Array} columns - MRT column definitions (accessorKey, header, Cell, etc.)
 * @param {Array} data - Table data
 * @param {Object} options - (optional) Additional MRT table options
 * @param {boolean} loading - (optional) Show loading effect
 * @param {Object} rest - (optional) Any other props for MaterialReactTable
 */
const MuiTable = ({
  className,
  columns = [],
  data = [],
  options = {},
  enablePagination = true,
  loading = false,
  rowsPerPageOptions = [10, 20, 50, 100, 200],
  enableStickyHeader = true,
  paginationDisplayMode = 'pages',
  onPageChange,
  onPageSizeChange,
  manualPagination = false,
  enableGlobalFilter = false,
  enableCellActions = false,
  enableColumnActions = false,
  enableDensityToggle = false,
  enableRowOrdering = false,
  enableSorting = false,
  enableTopToolbar = false,
  globalFilter,
  rowCount = 0,
  currentPage = 1,
  pageSize = 10,
  ...rest
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Initialize drag scroll functionality
  const dragScroll = useDragScroll();

  // Handle pagination changes
  const handlePaginationChange = (updater) => {
    if (typeof updater === 'function') {
      const newState = updater({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      });

      // Check if page size changed
      if (newState.pageSize !== pageSize && onPageSizeChange) {
        onPageSizeChange(newState.pageSize);
      } else if (newState.pageIndex !== currentPage - 1 && onPageChange) {
        onPageChange(newState.pageIndex + 1);
      }
    } else {
      // Handle direct state object
      if (updater.pageSize !== pageSize && onPageSizeChange) {
        onPageSizeChange(updater.pageSize);
      } else if (updater.pageIndex !== currentPage - 1 && onPageChange) {
        onPageChange(updater.pageIndex + 1);
      }
    }
  };

  const headerBg = theme.palette.mode === 'dark' ? darken(theme.palette.background.paper, 0.2) : '#f0f4fa';
  const oddRowBg = theme.palette.mode === 'dark' ? darken(theme.palette.background.paper, 0.08) : '#f5f5f5';

  // Create responsive columns that hide less important ones on mobile
  const responsiveColumns = columns.map(column => {
    const isActionColumn = column.accessorKey === 'action';
    const isImportantColumn = ['name', 'title', 'status', 'email'].includes(column.accessorKey);

    const newColumn = {
      ...column,
      // Hide less important columns on mobile, but keep action column
      enableHiding: !isActionColumn,
      // Show only important columns on mobile
      enableColumnFilter: !isMobile,
      enableSorting: !isMobile || isImportantColumn,
      // Adjust column size for mobile - use flex to distribute evenly
      size: isMobile ? (isImportantColumn ? 120 : 100) : column.size || 150,
      // Use flex for mobile to distribute columns evenly
      flex: isMobile ? 1 : undefined,
      // Force minimum width for better distribution
      minSize: isMobile ? 80 : undefined,
    };

    // Handle Cell property properly
    if (column.Cell && typeof column.Cell === 'function') {
      newColumn.Cell = ({ cell, row, column: col }) => {
        // For action columns, make buttons more touch-friendly on mobile
        if (isActionColumn && isMobile) {
          return (
            <div style={{
              padding: '8px 12px',
              minHeight: '44px', // Touch target minimum
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {column.Cell({ cell, row, column: col })}
            </div>
          );
        }
        return column.Cell({ cell, row, column: col });
      };
    }

    return newColumn;
  });

  return (
    <MaterialReactTable
      className={className}
      columns={responsiveColumns}
      data={data}
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: isMobile ? '8px' : '10px',
          border: '1px solid #e0e0e0',
          overflow: 'hidden', // Prevent horizontal scroll on mobile
          width: '100%', // Ensure table doesn't exceed container width
          maxWidth: '100%', // Prevent overflow
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr:nth-of-type(odd) > td': {
            backgroundColor: oddRowBg,
          },
         /*  '& tr:nth-of-type(even) > td': {
            backgroundColor: '#ffffff',
          },
 */
          // Mobile-specific row styling
          '& tr': {
            minHeight: isMobile ? '48px' : 'auto',
          },
        },
      }}
      muiTableContainerProps={{
        ref: dragScroll.containerRef,
        onMouseDown: dragScroll.handleMouseDown,
        onMouseMove: dragScroll.handleMouseMove,
        onMouseUp: dragScroll.handleMouseUp,
        onMouseLeave: dragScroll.handleMouseLeave,
        sx: {
          maxHeight: isMobile ? 400 : 500,
          boxShadow: 'none',
          overflowY: 'auto',
          overflowX: 'auto', // Allow horizontal scroll
          width: '100%', // Ensure container takes full width
          maxWidth: '100%', // Prevent container overflow
          cursor: 'grab', // Show grab cursor to indicate draggable
          '&:active': {
            cursor: 'grabbing', // Show grabbing cursor when dragging
          },

          // Ensure table takes full width of container
          '& table': {
            width: '100% !important',
            minWidth: '100% !important',
          },
          '& .MuiTable-root': {
            width: '100% !important',
            minWidth: '100% !important',
          },
          '& .MuiTableHead-root': {
            width: '100% !important',
          },
          '& .MuiTableBody-root': {
            width: '100% !important',
          },
          '& .MuiTableRow-root': {
            width: '100% !important',
          },
          '& .MuiTableCell-root': {
            width: isMobile ? 'auto' : undefined,
          },
          // Mobile-specific container styling
          '&::-webkit-scrollbar': {
            width: isMobile ? '4px' : '8px',
            height: isMobile ? '4px' : '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: theme.palette.mode === 'dark' ? '#2d2d2d' : '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.mode === 'dark' ? '#555' : '#c1c1c1',
            borderRadius: '4px',
          },
          // Disable text selection during drag
          '& *': {
            userSelect: 'none',
          },
        }
      }}
      muiTableBodyCellProps={{
        sx: {
          px: isMobile ? (isSmallMobile ? 1 : 2) : 2,
          py: isMobile ? 0.6 : 1.2,
          fontSize: isMobile ? '0.875rem' : '1rem',
          // Prevent text overflow on mobile
          wordBreak: isMobile ? 'break-word' : 'normal',
          whiteSpace: isMobile ? 'normal' : 'nowrap',
        }
      }}
      muiTableHeadCellProps={{
        sx: {
          px: isMobile ? (isSmallMobile ? 1 : 2) : 2,
          py: isMobile ? 0.6 : 1.2,
          backgroundColor: headerBg,
          fontSize: isMobile ? '0.875rem' : '1rem',
          fontWeight: 600,
        }
      }}
      // Mobile-specific features
      enableColumnResizing={!isMobile}
      enableRowActions={false} // Disable row actions column
      //enableSorting
      enableStickyHeader={enableStickyHeader}
      enableColumnFilters={false}
      enableGlobalFilter={enableGlobalFilter}
      enableDensityToggle={false}
      enableFullScreenToggle={true}
      enableHiding={true}
      // Layout mode for better column distribution
      layoutMode={isMobile ? 'grid' : 'semantic'}

      enableCellActions={enableCellActions}
      enableColumnActions={enableColumnActions}
      enableRowOrdering={enableRowOrdering}
      enableSorting={enableSorting}
      enableTopToolbar={enableTopToolbar}



      paginationDisplayMode={paginationDisplayMode}
      enablePagination={enablePagination}
      manualPagination={manualPagination}
      rowCount={manualPagination ? rowCount : undefined}
      onPaginationChange={enablePagination ? handlePaginationChange : undefined}
      muiPaginationProps={{
        color: 'primary',
        variant: 'outlined',
        rowsPerPageOptions: rowsPerPageOptions,
        shape: 'rounded'
      }}
      // Mobile pagination settings
      muiTablePaginationProps={{
        sx: {
          // Mobile pagination styling
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          },
          '& .MuiTablePagination-select': {
            fontSize: isMobile ? '0.75rem' : '0.875rem',
          },
        },
        rowsPerPageOptions: rowsPerPageOptions,
        showFirstButton: true,
        showLastButton: true,
      }}
      // Mobile-specific display options
      displayColumnDefOptions={{
        'mrt-row-actions': {
          size: isMobile ? 60 : 80,
        },
      }}
      // Additional mobile table styling
      muiTableProps={{
        sx: {
          width: '100% !important',
          minWidth: '100% !important',
          tableLayout: 'fixed', // Use fixed layout for consistent column distribution
          // Force table to take full width
          '& .MuiTable-root': {
            width: '100% !important',
            minWidth: '100% !important',
          },
          '& .MuiTableHead-root': {
            width: '100% !important',
          },
          '& .MuiTableBody-root': {
            width: '100% !important',
          },
        },
      }}
      state={{
        globalFilter: globalFilter,
        isLoading: loading,
        ...(manualPagination && {
          pagination: {
            pageIndex: currentPage - 1,
            pageSize: pageSize,
          }
        })
      }}
      {...options}
      {...rest}

    />
  );
};

export default MuiTable;
