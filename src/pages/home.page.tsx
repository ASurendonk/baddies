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
    try {
      const response = generate(newPlayers);
      setPlayers(newPlayers);
      setMatches(response);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
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
    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a);

    const grouped: Record<number, string[]> = {};
    for (const [player, score] of sorted) {
      if (!grouped[score]) grouped[score] = [];
      grouped[score].push(player);
    }

    const result: { players: string[]; score: number }[] = [];
    let shownCount = 0;

    for (const score of Object.keys(grouped).map(Number).sort((a, b) => b - a)) {
      const group = grouped[score];
      result.push({ players: group, score });
      shownCount = group.length;
      if (shownCount >= 3) break;
    }

    return result;
  }, [scores]);

  const winners = useMemo(() => {
    const winnerNames: string[][] = [];
    getTopPlayers().map(({ players }) => (
      winnerNames.push(players)
    ));
    return `🥇 ${winnerNames[0]?.join(" & ") ?? ""}
🟨🥈 ${winnerNames[1]?.join(" & ") ?? ""}
🟨⬜🥉 ${winnerNames[2]?.join(" & ") ?? ""}
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
        <NumberedTextarea
          value={names}
          onChange={v => setNames(v)} placeholder="Type player names (4 - 16)"
          onClearClick={() => setNames("")}
        />
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
