import { IconButton, InputAdornment, TextField, useTheme } from "@mui/material";
import { Clear } from "@mui/icons-material";

interface InputProps {
  value?: string;
  onChange(value: string): void;
  placeholder?: string;
  onClearClick?(): void;
  disabled?: boolean;
}

const Input = ({ value, onChange, placeholder, onClearClick, disabled }: InputProps) => {
  const theme = useTheme();

  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      disabled={disabled}
      multiline
      minRows={3}
      sx={{
        '& .MuiOutlinedInput-root': {
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
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" sx={{ mt: 1, alignSelf: "start" }}>
            <IconButton
              aria-label="clear input"
              onClick={onClearClick}
              edge="end"
            >
              <Clear sx={{ color: theme.palette.common.black }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default Input;
