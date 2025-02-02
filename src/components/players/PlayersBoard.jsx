import useFetch from "../../hooks/useFetch";
import PlayerCard from "./PlayerCard";
import { useEffect, useRef, useState } from "react";

const PlayersBoard = () => {
  const [skaters, setSkaters] = useState("");
  const [selectedSkaters, setSelectedSkaters] = useState(null);
  const { request, error, loading } = useFetch();
  const [isFirstSelected, setIsFirstSelected] = useState(true);
  const [isPlayed, setIsPlayed] = useState(false);
  const [winner, setWinner] = useState(null);
  const selectedSetRef = useRef(false);

  const sp = [16, 24, 40, 100];

  const fetchSkaters = async () => {
    const data = await request("/");
    if (data.data) {
      setSkaters(data.data.sort((a, b) => b.points - a.points));
      if (!selectedSetRef.current) {
        setSelectedSkaters([data.data[0], data.data[1]]);
        selectedSetRef.current = true;
      }
    }
  };
  useEffect(() => {
    fetchSkaters();
  }, []);

  if (loading) return <p>Cargando patinadores...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (skater) => {
    console.log("-------------------");
    console.log(skater);
    if (isFirstSelected) {
      setSelectedSkaters([skater, selectedSkaters[1]]);
      setIsFirstSelected(false);
    } else {
      setSelectedSkaters([selectedSkaters[0], skater]);
      setIsFirstSelected(true);
    }
  };
  const findClosestNumber = (num) => {
    return sp.reduce((closest, current) => {
      return Math.abs(current - num) < Math.abs(closest - num)
        ? current
        : closest;
    });
  };

  const setGameResults = async () => {
    setIsPlayed(false);

    const looser = selectedSkaters.find(
      (skater) => skater.name !== winner.name
    );
    const points = findClosestNumber(Math.abs(looser.points - winner.points));

    const winnerRes = await request("/" + winner.id, "PUT", {
      name: winner.name,
      points: Number(winner.points) + Number(points),
      instagram: winner.instagram,
      img: winner.img,
    });

    const looserRes = await request("/" + looser.id, "PUT", {
      name: looser.name,
      points: Number(looser.points) - Number(points),
      instagram: looser.instagram,
      img: looser.img,
    });

    if (winnerRes.status === 200 && looserRes.status === 200) {
      const updatedData = await request("/");

      if (updatedData.data) {
        const sortedSkaters = updatedData.data.sort(
          (a, b) => b.points - a.points
        );
        setSkaters(sortedSkaters);

        setSelectedSkaters([
          sortedSkaters.find((s) => s.id === winner.id) || sortedSkaters[0],
          sortedSkaters.find((s) => s.id === looser.id) || sortedSkaters[1],
        ]);
      }
    }

    setWinner(null);
  };

  if (winner && isPlayed) {
    setGameResults();
  }

  if (!skaters) {
    return <p>No hay patinadores disponibles</p>;
  }

  return (
    <>
      <section
        id="skaters"
        className="mx-8 my-4 md:mx-10 md:my:5 flex flex-col gap-4 text-center"
      >
        <h2 className="text-2xl font-sigmar  ">Patinadores</h2>
        <div className="grid grid-cols-4 gap-2">
          {skaters.map((skater) => (
            <div
              key={skater.id}
              onClick={() => handleClick(skater)}
              className="bg-gray-500 cursor-pointer rounded-lg  capitalize p-2 text-xs md:text-base"
            >
              {skater.name}
            </div>
          ))}
        </div>

        {isPlayed && (
          <div>
            <p className="text-2xl">¿Quién gano?</p>
          </div>
        )}
        <div className="flex gap items-center gap-2 justify-center ">
          <PlayerCard
            skater={selectedSkaters[0]}
            isPlayed={isPlayed}
            setWinner={setWinner}
          />
          <span className="text-2xl">VS</span>
          <PlayerCard
            skater={selectedSkaters[1]}
            isPlayed={isPlayed}
            setWinner={setWinner}
          />
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <p>
              Diferencia de SP:{" "}
              {Math.abs(selectedSkaters[0].points - selectedSkaters[1].points)}
            </p>
            <p>
              Juego por:{" "}
              {findClosestNumber(
                Math.abs(selectedSkaters[0].points - selectedSkaters[1].points)
              )}
              {" SP"}
            </p>
            <div>
              {!isPlayed && (
                <button
                  onClick={() => setIsPlayed(true)}
                  className="bg-green-600 text-white p-2 rounded-xl cursor-pointer"
                >
                  Jugar
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t">
          <h2 className="text-3xl">PlayOffs</h2>
          <p>Proximamente...</p>
        </div>
      </section>
    </>
  );
};
export default PlayersBoard;
