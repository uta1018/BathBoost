import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";
import Navbar from "../common/Navbar";

const Fortune = () => {
  const fortuneResultCount = 5;
  const navigate = useNavigate();

  const handleRandomNavigate = () => {
    // 0 から 4 までのランダムな整数
    const randomId = Math.floor(Math.random() * fortuneResultCount);
    navigate(`/fortune/${randomId}`, { state: { isAuthorized: true } });
  };

  return (
    <div>
      <PageHeader title="うらない" />
      <div style={{ position: "relative", top: "100px" }}>
        <button onClick={handleRandomNavigate}>交換する</button>
      </div>
      <Navbar currentPage="fortune" />
    </div>
  );
};

export default Fortune;
