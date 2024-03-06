import { useState } from "react";
import useData from "../hooks/useData";
import TeamCard from "./TeamCard";
import shuffle from "../lib/shuffle";
import EndModal from "./EndModal";

export default function Game() {
  const teamsData = useData(
    "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=NBA",
  );
  const teamsList = teamsData ? shuffle(teamsData.teams) : null;

  const [bestScore, setBestScore] = useState(0);
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState("playing");
  const currentScore = history.length;

  const handleClick = (event) => {
    const id = event.currentTarget.id;
    if (history.includes(id)) {
      setGameState("gameover");
    } else {
      setHistory([...history, id]);
      if (currentScore + 1 >= bestScore) {
        setBestScore(currentScore + 1);
      }
      if (currentScore + 1 === 30) {
        setBestScore(currentScore + 1);
        setGameState("gameover");
      }
    }
  };

  const handleRetry = () => {
    setGameState("playing");
    setHistory([]);
  };
  return (
    <div className="min-h-screen flex flex-col text-[#283618] p-2">
      <EndModal
        show={gameState === "gameover"}
        handleRetry={handleRetry}
        gameStats={{
          isSuccess: currentScore === 5 ? true : false,
          currentScore: currentScore,
          bestScore: bestScore,
          teamsMissed: teamsList
            ? teamsList.filter((x) => !history.includes(x.idTeam))
            : null,
        }}
      />
      <section className="text-center border-b-2 border-[#283618]">
        <h1 className="text-xl font-bold">Memory Hoops</h1>
        <p>
          Can you remember all 30 NBA teams to determine your team&apos;s
          success this season?
        </p>
      </section>
      <section>
        <h2 className="text-base">{"Best Score: " + bestScore}</h2>
        <h2 className="text-base">{"Current Score: " + currentScore}</h2>
      </section>
      <ul className="p-1 grow grid bg-[#283618] grid-rows-[repeat(auto-fit,minmax(150px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1">
        {teamsList
          ? teamsList.map((team) => {
              return (
                <li
                  key={team.idTeam}
                  id={team.idTeam}
                  className="border border-[#606C38] hover:bg-violet-600"
                  onClick={handleClick}
                >
                  <TeamCard teamInfo={team} />
                </li>
              );
            })
          : "loading"}
      </ul>
    </div>
  );
}
