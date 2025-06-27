import { Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import Button from "../components/button.tsx";
import { useIsMobile } from "../hooks/useIsMobile.ts";
import NumberedTextarea from "../components/numberedTextArea.tsx";
import { generate, type Round } from "../helpers/roundRobin.ts";
import Matchbox from "../components/matchbox.tsx";
import { toast } from "react-toastify";

function shuffle(array: string[]) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

type Team = {
  name: string;
  players: string[];
}

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  const [names, setNames] = useLocalStorage<string>("playerNamesInput", "");
  const [players, setPlayers] = useLocalStorage<string[]>("players", []);
  const [matches, setMatches] = useLocalStorage<Round[]>("matches", []);

  const [scores, setScores] = useLocalStorage<Record<string, number>>("scores", {});
  const [matchWinners, setMatchWinners] = useLocalStorage<Record<string, Team>>("matchWinners", {});

  const onGenerateMatches = useCallback(() => {
    const newPlayers = names.split("\n");
    shuffle(newPlayers);
    setPlayers(newPlayers);
    const response = generate(newPlayers);
    setMatches(response);
  }, [names, setPlayers, setMatches]);

  const onResetClick = useCallback(() => {
    setPlayers([]);
    setMatches([]);
    setScores({});
    setMatchWinners({});
  }, [setPlayers, setMatches, setScores, setMatchWinners]);

  const getMatchKey = (roundIndex: number, matchIndex: number) => `${roundIndex}-${matchIndex}`;

  const handleMatchClick = (
    roundIndex: number,
    matchIndex: number,
    team: "A" | "B",
    teamPlayers: string[]
  ) => {
    const key = getMatchKey(roundIndex, matchIndex);

    if (matchWinners[key]) {
      setMatchWinners(prev => {
        const newSet = { ...prev };
        newSet[key] = { name: team, players: teamPlayers };
        return newSet
      });
    } else {
      setMatchWinners(prev => ({ ...prev, [key]: { name: team, players: teamPlayers } }));
    }
  };

  useEffect(() => {
    const scores: Record<string, number> = {}
    players.forEach(player => {
      scores[player] = 0;
    });
    Object.entries(matchWinners).forEach((value) => {
      value[1].players.forEach(player => {
        scores[player] += 1;
      })
    });
    setScores(scores);
  }, [matchWinners, players, setScores]);

  const checkWin = useCallback((key: string, team: "A" | "B") => {
    const currentValue = matchWinners[key];
    if (currentValue === undefined) {
      return;
    }
    return currentValue.name === team;
  }, [matchWinners]);

  const getTopPlayers = useCallback(() => {
    return Object.entries(scores)
      .sort(([, a], [, b]) => b - a) // Sort descending by score
      .slice(0, 3); // Top 3 only
  }, [scores]);

  const winners = useMemo(() => {
    const winnerNames: string[] = [];
    getTopPlayers().map(([player]) => (
      winnerNames.push(player)
    ));
    return `🥇 ${winnerNames[0]}
🟨🥈 ${winnerNames[1]}
🟨⬜🥉 ${winnerNames[2]}
️️️🟨⬜🟧`;
  }, [getTopPlayers]);

  const shareResults = useCallback(() => {
    navigator.clipboard.writeText(winners);
    toast.success("Result copied to clipboard");
  }, [winners]);
  console.log(getTopPlayers());

  return (
    <Stack bgcolor={theme.palette.background.default} gap={4} alignItems="center" py="50px">
      {players.length <= 0 && (
        <NumberedTextarea value={names} onChange={v => setNames(v)} placeholder="Type player names (4 - 16)" />
      )}

      <Stack gap={1} flexDirection={isMobile ? "column" : "row" as "column" | "row"} alignSelf={isMobile ? "stretch" : ""}>
        {players.length > 0 ? (
          <Button label="RESET MATCH" onClick={onResetClick} />
        ) : (
          <Button label="GENERATE MATCHES" onClick={onGenerateMatches} />
        )}
      </Stack>

      {players.length > 0 && (
        <Typography variant="h2" textAlign="center">Games</Typography>
      )}

      <Stack gap={2} width="100%">
        {matches.map((round, roundIndex) => {
          return (
            <Stack width="100%" gap={2}>
              {
                round.matches.map((match, matchIndex) => {
                  return (
                    <Stack flexDirection="row" gap={isMobile ? "15px" : "30px"} alignItems="center">
                      <Matchbox
                        team={match.teamA}
                        onClick={() => handleMatchClick(roundIndex, matchIndex, "A", match.teamA)}
                        isWinner={checkWin(`${roundIndex}-${matchIndex}`, "A")}
                      />
                      VS
                      <Matchbox
                        team={match.teamB}
                        onClick={() => handleMatchClick(roundIndex, matchIndex, "B", match.teamB)}
                        isWinner={checkWin(`${roundIndex}-${matchIndex}`, "B")}
                      />
                    </Stack>
                  );
                })
              }
            </Stack>
          );
        })}
      </Stack>
      <Stack gap={2}>
        {Object.keys(matchWinners).length > 0 && (
          <Stack gap={2}>
            <Typography variant="h2" textAlign="center">Winners</Typography>
            <Typography sx={{ whiteSpace: "pre-line" }}>{winners}</Typography>
            <Button label="SHARE RESULT" onClick={shareResults} />
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default HomePage;
