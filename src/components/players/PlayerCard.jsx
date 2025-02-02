const PlayerCard = ({ skater, isPlayed, setWinner }) => {
  const isWiner = (skater) => {
    if (isPlayed) {
      if (
        confirm(
          "¿El ganador fue " +
            skater.name.charAt(0).toUpperCase() +
            skater.name.slice(1) +
            " ?"
        )
      ) {
        setWinner(skater);
      }
    }
  };

  return (
    <div onClick={() => isWiner(skater)}>
      <img
        className={`${
          isPlayed
            ? "hover:scale-105 cursor-pointer transition-transform will-change-transform"
            : ""
        } w-72`}
        src={skater.img}
        alt=""
      />
      <p className="text-xl font-sigmar tracking-widest capitalize">
        {skater.name}
      </p>
      <p>Puntos: {skater.points}</p>
    </div>
  );
};
export default PlayerCard;
