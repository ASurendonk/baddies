import { Box } from "@mui/material";

const SPACING = 12;

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: 0, marginTop: -SPACING, fontSize: '18px', lineHeight: '28px' }}>
      {children}
    </Box>
  );
}

interface ListItemProps {
  children: React.ReactNode | string;
  bullet?: string;
}

const ListItem = ({ children, bullet = "▪️" }: ListItemProps) => {
  return (<Box textAlign="center" mt={`${SPACING}px`} lineHeight="normal">{bullet} {children}</Box>);
}

export { List, ListItem };
