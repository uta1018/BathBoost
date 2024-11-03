import { useParams } from "react-router-dom";

const FortuneResult = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Fortune Result {id}</h2>
    </div>
  );
};

export default FortuneResult;
