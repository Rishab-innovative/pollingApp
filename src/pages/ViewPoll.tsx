import Navbar from "../components/Navbar";
const ViewPoll: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="view-poll-container">
        <div className="poll-box">
          <div className="title">This is title</div>
          <div className="options">option list</div>
        </div>
      </div>
    </>
  );
};
export default ViewPoll;
