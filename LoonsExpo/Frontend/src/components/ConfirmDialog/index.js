import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './ConfirmDialog.css';
import '../../styles/buttonColors.css';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';

const TYPE_COLORS = {
  info: '#19b6e9',
  error: '#e53935',
  warning: '#fbc02d',
  success: '#43a047',
};
const TYPE_ICONS = {
  info: <InfoOutlineIcon sx={{color: TYPE_COLORS.info,width:'60px',height:'60px'}} />,
  error: <ReportGmailerrorredIcon sx={{color: TYPE_COLORS.error,width:'60px',height:'60px'}} />,
  warning: <WarningAmberIcon sx={{color: TYPE_COLORS.warning,width:'60px',height:'60px'}} />,
  success: <CheckCircleOutlineIcon sx={{color: TYPE_COLORS.success,width:'60px',height:'60px'}} />,
};

/**
 * Show a custom confirmation dialog.
 * @param {Object} params
 * @param {'info'|'error'|'warning'|'success'} [params.type] - Dialog type for top border color.
 * @param {React.ReactNode} [params.icon] - Icon or image to show on the left.
 * @param {string} [params.title] - Title text.
 * @param {string} [params.description] - Description text.
 * @param {Array} [params.buttons] - Array of button objects { label, onClick, className, style }
 */
function ConfirmDialog({
  type = 'info',
  icon = null,
  title = 'Are you sure?',
  description = '',
  buttons = []
}) {
  confirmAlert({
    customUI: ({ onClose }) => (
      <div className="custom-confirm-dialog" style={{borderTopStyle:'solid', borderTopWidth:'6px', borderColor: TYPE_COLORS[type] || TYPE_COLORS.info}}>

        <div className="custom-confirm-dialog__top" />
        <div className="custom-confirm-dialog__content">
          <div className="custom-confirm-dialog__icon">
            {icon || TYPE_ICONS[type]}
          </div>
          <div className="custom-confirm-dialog__text">
            <div className="custom-confirm-dialog__title">{title}</div>
            <div className="custom-confirm-dialog__desc">{description}</div>
          </div>
        </div>
        <div className="custom-confirm-dialog__divider" />
        <div className="custom-confirm-dialog__actions">
          {buttons.map((btn, idx) => (
            <Button
              key={idx}
              className={`custom-confirm-dialog__btn ${btn.className || ''}`}
              onClick={() => {
                btn.onClick && btn.onClick();
                onClose();
              }}
              style={btn.style}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </div>
    ),
    closeOnEscape: true,
    closeOnClickOutside: true,
  });
}

export default ConfirmDialog;
