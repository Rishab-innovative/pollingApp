import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { fetchPollList } from "../redux/PollListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Polling: React.FC = () => {
  const polls = useSelector((state: RootState) => state.pollList);
  const [votedItems, setVotedItems] = useState<string[]>([]);
  const [userRole,setUserRole]=useState<string>();
  const dispatch = useDispatch<AppDispatchType>();
  useEffect(() => {
    dispatch(fetchPollList());
  }, []);
  const handleVote = (itemTitle: string) => {
    setVotedItems((prevVotedItems) => [...prevVotedItems, itemTitle]);
  };
  const isItemVoted = (itemTitle: string) => {
    return votedItems.includes(itemTitle);
  };
  useEffect(() => {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserRole(JSON.parse(userDataFromLocalStorage).roleId);
    }
  }, []);
  return (
    <>
      <Navbar />
      {polls.isLoading === true ? (
        <Spinner animation="border" variant="success" className="polling-spinner" />
      ) : (
        <div className="container" style={{ marginTop: "2rem" }}>
          {polls.data.map((item: any) => (
            <Card>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  TITLE:-
                  {item.title}
                  <AiFillEdit />
                  <AiFillDelete />
                </Card.Title>
              </Card.Body>
              {item.optionList.map((option: any) => (
                <ListGroup variant="flush" key={option.optionTitle}>
                  <ListGroup.Item>
                    <Form.Check type={"checkbox"} label={option.optionTitle}
                      onChange={() => handleVote(item.title)}
                      disabled={isItemVoted(item.title)}/>
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </Card>
          ))}
          <Button variant="success" className="showMore-btn">
            Show More
          </Button>
        </div>
      )}
    </>
  );
};
export default Polling;