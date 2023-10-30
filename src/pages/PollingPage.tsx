import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollList } from "../redux/PollListSlice";
import { useNavigate } from "react-router-dom";
import "../css/PollListPage.css";
import { DeletePollData } from "../redux/DeletePollSlice";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import { BiExpand } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
const PollingPage: React.FC = () => {
  const navigate = useNavigate();
  const polls = useSelector((state: RootState) => state.pollList);
  const [votedItems, setVotedItems] = useState<string[]>([]);
  const [pagenumber, setNumber] = useState<number>(1);
  const [userRole, setUserRole] = useState<number>();
  const [hasVotedMap, setHasVotedMap] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [totalPolls, setTotalPolls] = useState<any>([]);
  const dispatch = useDispatch<AppDispatchType>();
  useEffect(() => {
    dispatch(fetchPollList(pagenumber));
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserRole(JSON.parse(userDataFromLocalStorage).roleId);
    }
  }, [pagenumber]);
  useEffect(() => {
    if (pagenumber !== 1) {
      setTotalPolls((prevTotalPolls: any) => [
        ...prevTotalPolls,
        ...polls.data,
      ]);
    } else {
      setTotalPolls([...polls.data]);
    }
  }, [polls.data]);
  const handleViewPoll = (id: number) => {
    navigate("/viewPoll");
  };
  const handleDelete = (id: number, index: number) => {
    dispatch(DeletePollData(id));
    const deletePoll = [...totalPolls];
    deletePoll.splice(index, 1);
    setTotalPolls([...deletePoll]);
  };
  const handleVote = (itemTitle: string) => {
    setVotedItems((prevVotedItems) => [...prevVotedItems, itemTitle]);
  };
  const handleSubmitVote = (pollTitle: string) => {
    if (votedItems.length === 1) {
      setHasVotedMap((prevHasVotedMap) => ({
        ...prevHasVotedMap,
        [pollTitle]: true,
      }));
    } else if (votedItems.length > 1) {
      setHasVotedMap((prevHasVotedMap) => ({
        ...prevHasVotedMap,
        [pollTitle]: true,
      }));
    } else {
      setHasVotedMap((prevHasVotedMap) => ({
        ...prevHasVotedMap,
        [pollTitle]: false,
      }));
    }
  };
  return (
    <>
      {polls.isLoading === true ? (
        <Spinner
          animation="border"
          variant="success"
          className="polling-spinner"
        />
      ) : (
        <div className="container" style={{ marginTop: "2rem" }}>
          {totalPolls.map((item: any, index: number) => (
            <Card key={item.createdAt}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  {item.title}
                  {userRole === 1 ? (
                    <>
                      <AiFillEdit onClick={() => navigate("/editPoll")} />
                      <AiFillDelete
                        onClick={() => handleDelete(item.id, index)}
                      />
                      <BiExpand onClick={() => handleViewPoll(item.id)} />
                      <AiOutlineBarChart />
                    </>
                  ) : (
                    <BiExpand />
                  )}
                </Card.Title>
              </Card.Body>
              {item.optionList.map((option: any) => (
                <ListGroup variant="flush" key={option.title}>
                  <ListGroup.Item>
                    <Form.Check
                      type={"checkbox"}
                      label={option.optionTitle}
                      disabled={hasVotedMap[item.title]}
                      onChange={() => handleVote(option.optionTitle)}
                    />
                  </ListGroup.Item>
                </ListGroup>
              ))}
              <Button
                className="submit-vote mx-3"
                variant="success"
                disabled={hasVotedMap[item.title]}
                onClick={() => handleSubmitVote(item.title)}
              >
                Submit
              </Button>
              {hasVotedMap[item.title] && (
                <div className="Please give a vote">
                  {hasVotedMap[item.title]}
                </div>
              )}
            </Card>
          ))}
          {polls.size === 10 ? (
            <Button
              variant="success"
              className="showMore-btn"
              onClick={() => setNumber(pagenumber + 1)}
            >
              Load More..
            </Button>
          ) : (
            <Button variant="success" disabled className="showMore-btn">
              Load More..
            </Button>
          )}
        </div>
      )}
    </>
  );
};
export default PollingPage;
