import { Button as MUIButton, useTheme } from "@mui/material";

interface ButtonProps {
  label: string;
  selected?: boolean;
  onClick?(): void;
}

const Button = ({ label, selected, onClick }: ButtonProps) => {
  const theme = useTheme();

  return (
    <MUIButton
      variant="contained"
      color="primary"
      sx={{
        flex: 1,
        backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.main,
        textDecoration: selected ? "underline" : "inherit",
        '&:hover': {
          backgroundColor: selected ? theme.palette.primary.dark : theme.palette.primary.light,
          textDecoration: selected ? "underline" : "inherit",
        },
        whiteSpace: "nowrap",
      }}
      onClick={onClick}
    >
      {label}
    </MUIButton>
  );
}

export default Button;
