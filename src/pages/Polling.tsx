import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollList } from "../redux/PollListSlice";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import Navbar from "../components/Navbar";

const Polling: React.FC = () => {
  const polls = useSelector((state: RootState) => state.pollList);
  const [votedItems, setVotedItems] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<number>();
  const [hasVotedMap, setHasVotedMap] = useState<{ [key: string]: boolean }>(
    {}
  );

  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    dispatch(fetchPollList());
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserRole(JSON.parse(userDataFromLocalStorage).roleId);
    }
  }, []);

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
      <Navbar />
      {polls.isLoading === true ? (
        <Spinner
          animation="border"
          variant="success"
          className="polling-spinner"
        />
      ) : (
        <div className="container" style={{ marginTop: "2rem" }}>
          {userRole === 1 ? (
            <Button variant="success">Show Result</Button>
          ) : null}
          {polls.data.map((item: any) => (
            <Card key={item.title}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  {item.title}
                  {userRole === 1 ? (
                    <>
                      <AiFillEdit />
                      <AiFillDelete />
                    </>
                  ) : null}
                </Card.Title>
              </Card.Body>
              {item.optionList.map((option: any) => (
                <ListGroup variant="flush" key={option.optionTitle}>
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
                className="submit-vote"
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
          <Button
            variant="success"
            className="showMore-btn"
            onClick={() => dispatch(fetchPollList())}
          >
            Load More..
          </Button>
        </div>
      )}
    </>
  );
};

export default Polling;
