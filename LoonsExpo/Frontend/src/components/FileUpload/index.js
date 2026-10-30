import React, { useState, useRef, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Alert,
  Grid
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';

const DropZone = styled(Box)(({ theme, isDragOver, hasError }) => ({
  border: `2px dashed ${hasError ? theme.palette.error.main : isDragOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: hasError ? theme.palette.error.light : isDragOver ? theme.palette.primary.light :null/*  theme.palette.background.paper */,
  transition: 'all 0.3s ease',
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    borderColor: theme.palette.primary.main,
   // backgroundColor: theme.palette.primary.light,
  },
}));

const FilePreview = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  margin: theme.spacing(1),
  '& img': {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}));

const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: -8,
  right: -8,
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  width: 24,
  height: 24,
  '&:hover': {
    backgroundColor: theme.palette.error.dark,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 16,
  },
}));

const FileUpload = ({
  value = [],
  onChange,
  multiple = false,
  required = false,
  acceptedFileTypes = ['image/*'],
  maxSingleFileSize = 5 * 1024 * 1024, // 5MB
  maxTotalFilesSize = 20 * 1024 * 1024, // 20MB
  maxFiles = 10,
  label = 'Upload Files',
  helperText = 'Drag and drop files here or click to browse',
  error = false,
  disabled = false,
  sx = {},
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState([]);
  const fileInputRef = useRef();

  const validateFile = useCallback((file) => {
    const newErrors = [];

    // Check file type
    const isValidType = acceptedFileTypes.some(type => {
      if (type.endsWith('/*')) {
        const baseType = type.split('/')[0];
        return file.type.startsWith(baseType);
      }
      return file.type === type;
    });

    if (!isValidType) {
      newErrors.push(`${file.name}: Invalid file type. Allowed types: ${acceptedFileTypes.join(', ')}`);
    }

    // Check file size
    if (file.size > maxSingleFileSize) {
      newErrors.push(`${file.name}: File size exceeds ${(maxSingleFileSize / 1024 / 1024).toFixed(1)}MB limit`);
    }

    return newErrors;
  }, [acceptedFileTypes, maxSingleFileSize]);

  const validateFiles = useCallback((files) => {
    const newErrors = [];

    // Check total number of files
    if (multiple && files.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed`);
    }

    // Check total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxTotalFilesSize) {
      newErrors.push(`Total file size exceeds ${(maxTotalFilesSize / 1024 / 1024).toFixed(1)}MB limit`);
    }

    // Validate individual files
    files.forEach(file => {
      const fileErrors = validateFile(file);
      newErrors.push(...fileErrors);
    });

    return newErrors;
  }, [multiple, maxFiles, maxTotalFilesSize, validateFile]);

  const handleFiles = useCallback((files) => {
    const fileArray = Array.from(files);
    const validationErrors = validateFiles(fileArray);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    if (multiple) {
      onChange([...value, ...fileArray]);
    } else {
      onChange(fileArray.slice(0, 1));
    }
  }, [value, onChange, multiple, validateFiles]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  }, [handleFiles, disabled]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  }, [handleFiles]);

  const handleRemoveFile = useCallback((index) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  }, [value, onChange]);

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  const isImage = (file) => file.type.startsWith('image/');

  const renderFilePreview = (file, index) => {
    if (isImage(file)) {
      return (
        <FilePreview key={index}>
          <img src={URL.createObjectURL(file)} alt={file.name} />
          <RemoveButton
            size="small"
            onClick={() => handleRemoveFile(index)}
            disabled={disabled}
          >
            <DeleteIcon />
          </RemoveButton>
        </FilePreview>
      );
    }

    return (
      <Chip
        key={index}
        label={file.name}
        onDelete={disabled ? undefined : () => handleRemoveFile(index)}
        deleteIcon={<DeleteIcon />}
        sx={{ m: 0.5 }}
      />
    );
  };

  const hasError = error || errors.length > 0 || (required && value.length === 0);

  return (
    <Box sx={sx}>
      {label && (
        <Typography variant="body2" color="text.secondary" >
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </Typography>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedFileTypes.join(',')}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
        disabled={disabled}
      />

      <DropZone
        isDragOver={isDragOver}
        hasError={hasError}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        sx={{ opacity: disabled ? 0.6 : 1 }}
      >
        <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {value.length > 0 ? `${value.length} file(s) selected` : 'Image Upload'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {value.length > 0 ? 'Click to add more files' : 'No image selected'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
          {helperText}
        </Typography>
      </DropZone>

      {errors.length > 0 && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              {error}
            </Typography>
          ))}
        </Alert>
      )}

      {value.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={1}>
            {value.map((file, index) => (
              <Grid item key={index}>
                {renderFilePreview(file, index)}
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {required && value.length === 0 && !errors.length && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          This field is required
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
