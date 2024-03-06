import LebronJames from "../assets/james-lebron.jpg";
import PistonsImage from "../assets/detroit-pistons.jpg";

export default function EndModal({ handleRetry, show, gameStats }) {
  return (
    <div
      className={`${show ? "block" : "hidden"} fixed bg-[rgb(100,116,139,0.6)] top-0 left-0 w-screen h-screen p-8`}
    >
      <section className="bg-white rounded-xl p-4 flex flex-col gap-2 h-[90vh] overflow-auto">
        {gameStats.isSuccess ? (
          <div className="grow flex flex-col justify-around">
            <h1 className="text-2xl">Congratulations!</h1>
            <p className="text-2xl">You are an NBA Champion!</p>

            <img src={LebronJames} alt="lebron james" />
            <h2>I guess you do know ball!</h2>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl">You Lose!</h1>
            <p className="text-sm">I guess you don&apos;t know ball....</p>
            <img src={PistonsImage} alt="detroit pistons" />
            <div>
              <p className="text-xs mb-2">
                Your teams ends up last in the entire league with a
                record-breaking losing streak...
              </p>
              <p className="text-xs mb-2">Better luck next season!</p>
            </div>
            <h2 className="text-xs text-center font-semibold">
              Teams you missed:{" "}
            </h2>
            <ul className="border overflow-auto grid gap-2 grid-rows-[repeat(auto-fit,minmax(min-content,1fr))] grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
              {gameStats.teamsMissed
                ? gameStats.teamsMissed.map((team) => {
                    return (
                      <li key={team.idTeam} className="text-xs">
                        {team.strTeam}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        )}
        <h2 className="text-xs font-semibold">
          Best Score: {gameStats.bestScore ? gameStats.bestScore : 0}
        </h2>
        <h2 className="text-xs font-semibold">
          Current Score: {gameStats.currentScore ? gameStats.currentScore : 0}
        </h2>

        <div className="flex justify-center align-center">
          <button
            className="border-black max-w-[300px]"
            type="button"
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </section>
    </div>
  );
}
