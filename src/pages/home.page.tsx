import { Stack, useTheme } from "@mui/material";
import { useCallback, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import Button from "../components/button.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import NumberedTextarea from "../components/numberedTextArea.tsx";
import { generate, type Round } from "../helpers/roundRobin.ts";
import Matchbox from "../components/matchbox.tsx";

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  const [startTime, setStartTime] = useLocalStorage<number | null>("startTime", null);

  const [names, setNames] = useLocalStorage<string>("playerNamesInput", "");
  const [matches, setMatches] = useState<Round[]>([]);

  const onGenerateMatches = useCallback(() => {
    const response = generate(names.split("\n"));
    setMatches(response);
  }, [names]);

  const onResetClick = useCallback(() => {
    setStartTime(null);
  }, [setStartTime]);

  // const hasActiveGame = useMemo(() => !!startTime, [startTime]);

  return (
    <Stack bgcolor={theme.palette.background.default} gap={4} alignItems="center" py="50px">
      <NumberedTextarea value={names} onChange={v => setNames(v)} placeholder="Type player names (4 - 12)" />

      <Stack gap={1} flexDirection={isMobile ? "column" : "row" as "column" | "row"} alignSelf={isMobile ? "stretch" : ""}>
        {!!startTime && (
          <Button label="RESET TIME" onClick={onResetClick} />
        )}
        <Button label="GENERATE MATCHES" onClick={onGenerateMatches} />
      </Stack>

      <Stack gap={2} width="100%">
        {matches.map((round) => {
          return (
            <Stack width="100%" gap={2}>
              {/*<Typography variant="subtitle2" sx={{ fontSize: 12 }}>Round {index + 1}</Typography>*/}
              {
                round.matches.map(match => {
                  return (
                    <Stack flexDirection="row" gap={isMobile ? "15px" : "30px"} alignItems="center">
                      <Matchbox team={match.teamA} onClick={() => null} />
                      VS
                      <Matchbox team={match.teamB} onClick={() => null} />
                    </Stack>
                  );
                })
              }
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default HomePage;
