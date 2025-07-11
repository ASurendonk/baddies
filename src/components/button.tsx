import { Button as MUIButton, useTheme } from "@mui/material";

interface ButtonProps {
  label: string;
  fullwidth?: boolean;
  selected?: boolean;
  onClick?(): void;
  sx?: React.CSSProperties;
}

const Button = ({ label, selected, fullwidth, sx, onClick }: ButtonProps) => {
  const theme = useTheme();

  return (
    <MUIButton
      variant="contained"
      color="primary"
      sx={{
        width: fullwidth ? "100%" : "auto",
        flex: 1,
        backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.main,
        textDecoration: selected ? "underline" : "inherit",
        '&:hover': {
          backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
          textDecoration: selected ? "underline" : "inherit",
        },
        whiteSpace: "nowrap",
        ...sx,
      }}
      onClick={onClick}
    >
      {label}
    </MUIButton>
  );
}

export default Button;
