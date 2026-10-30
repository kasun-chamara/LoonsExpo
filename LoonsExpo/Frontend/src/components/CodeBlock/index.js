import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';

/**
 * CodeBlock - Component for displaying code snippets with copy functionality.
 *
 * @param {object} props
 * @param {string} props.code - The code to display.
 * @param {string} [props.language] - Programming language for syntax highlighting.
 * @param {string} [props.title] - Optional title for the code block.
 * @returns {JSX.Element}
 */
const CodeBlock = ({ code, language = 'jsx', title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'grey.100',
        borderRadius: 1,
        p: 2,
        mt: 2,
        position: 'relative',
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      {title && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Typography
          component="pre"
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            margin: 0,
            flex: 1,
            color: 'text.primary',
          }}
        >
          {code}
        </Typography>
        <Tooltip title={copied ? 'Copied!' : 'Copy code'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ ml: 1, flexShrink: 0 }}
          >
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

CodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string,
  title: PropTypes.string,
};

export default CodeBlock;
