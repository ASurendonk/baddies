import { Box, ButtonBase, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMemo } from "react";

interface MatchboxProps {
  team: string[],
  isWinner?: boolean,
  onClick: () => void,
}

const Matchbox: React.FC<MatchboxProps> = ({ team, isWinner }: MatchboxProps) => {
  const theme = useTheme();

  const textColor = useMemo(() => {
    if (isWinner === undefined) {
      return theme.palette.text.primary;
    } else if (isWinner) {
      return theme.palette.success.main;
    } else {
      return theme.palette.text.secondary;
    }
  }, [isWinner, theme]);

  const borderColor = useMemo(() => {
    if (isWinner === undefined) {
      return theme.palette.text.secondary;
    } else if (isWinner) {
      return theme.palette.success.main;
    } else {
      return theme.palette.text.secondary;
    }
  }, [isWinner, theme]);

  return (
    <Box
      flex={1}
      border={1}
      borderColor={borderColor}
      borderRadius={1}
      bgcolor={theme.palette.background.paper}
    >
      <ButtonBase sx={{ width: "100%", m: 0 }}>
        <Stack alignItems="start" width="100%" p="10px" position="relative">
          <Typography
            fontWeight={isWinner ? 700 : 400}
            color={textColor}
          >
            {team[0]}
          </Typography>
          <Typography
            fontWeight={isWinner ? 700 : 400}
            color={textColor}
          >
            {team[1]}
          </Typography>
          {isWinner && (
            <Stack position="absolute" right={10} top={0} bottom={0} justifyContent="center">
              <Typography>👍</Typography>
            </Stack>
          )}
        </Stack>
      </ButtonBase>
    </Box>
  );
};

export default Matchbox;
