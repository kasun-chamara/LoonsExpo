import React from 'react'
import PropTypes from 'prop-types'
import styles from './StatusChip.module.css'

const StatusChip = ({
  status,
  onClick,
  className
}) => {
  // Utility function to merge classNames
  const cn = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        styles.statusChip,
        styles[status.toLowerCase()],
        className,
        onClick && styles.clickable
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  )
}

// PropTypes for type checking
StatusChip.propTypes = {
  status: PropTypes.oneOf(['active', 'deactive']).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default StatusChip
