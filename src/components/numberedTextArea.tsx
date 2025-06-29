import { type FC, useMemo } from "react";
import { Box, IconButton, TextField, type TextFieldProps, useTheme } from "@mui/material";
import { Clear } from "@mui/icons-material";

interface NumberedTextareaProps extends Omit<TextFieldProps, 'onChange'> {
  value: string;
  onChange(value: string): void;
  onClearClick?(): void;
}

const NumberedTextarea: FC<NumberedTextareaProps> = ({
  value,
  onChange,
  onClearClick,
  placeholder,
  disabled,
  minRows = 3,
  sx,
  ...rest
}) => {
  const theme = useTheme();

  const lines = useMemo(() => value.split("\n"), [value]);
  const lineNumbers = useMemo(
    () => Array.from({ length: lines.length }, (_, i) => i + 1).join("\n"),
    [lines]
  );

  return (
    <Box width="100%" display="flex" alignItems="flex-start" sx={{ position: 'relative', ...sx }}>
      <TextField
        {...rest}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        multiline
        minRows={minRows}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            marginLeft: 0,
            paddingLeft: 4.5,
            '& textarea': {
              paddingLeft: theme.spacing(1),
              whiteSpace: 'pre',        // don't wrap
              overflowWrap: 'normal',   // no wrapping
              wordWrap: 'normal',       // no wrapping
              overflowX: 'auto',        // allow horizontal scroll
            },
            '& fieldset': {
              borderWidth: 1.5,
              borderColor: 'black !important',
            },
            '&:hover fieldset': {
              borderWidth: 1.5,
              borderColor: 'black',
            },
            '&.Mui-focused fieldset': {
              borderWidth: 1.5,
              borderColor: 'black',
            },
          },
        }}
        slotProps={{
          input: {
            endAdornment: onClearClick ? (
              <IconButton
                aria-label="clear input"
                onClick={onClearClick}
                edge="end"
                sx={{ position: "absolute", top: 0, right: 20, mt: 1 }}
              >
                <Clear sx={{ color: theme.palette.common.black }} />
              </IconButton>
            ) : undefined,
          },
        }}
        inputProps={{
          wrap: 'off'
        }}
      />
      <Box
        component="pre"
        sx={{
          margin: 0,
          top: 9,
          left: 8,
          padding: `${theme.spacing(1)} 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
          color: `${theme.palette.text.secondary}`,
          userSelect: 'none',
          fontFamily: 'Roboto, monospace',
          fontSize: '1em',
          lineHeight: '1.4375em',
          textAlign: 'left',
          position: 'absolute',
        }}
      >
        {lineNumbers}
      </Box>
    </Box>
  );
};

export default NumberedTextarea;
