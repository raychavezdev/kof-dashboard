import Header from "../components/Header";
import PlayersBoard from "../components/players/PlayersBoard";

const Matches = ({ logout }) => {
  return (
    <>
      <Header logout={logout} />
      <div>
        <PlayersBoard />
      </div>
    </>
  );
};

export default Matches;
