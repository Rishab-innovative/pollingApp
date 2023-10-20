import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { fetchPollList } from "../redux/PollListSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType, RootState } from "../redux/Store";

const Polling: React.FC = () => {
  const polls = useSelector((state: RootState) => state.pollList);
  const dispatch = useDispatch<AppDispatchType>();
  useEffect(() => {
    dispatch(fetchPollList());
    console.log("hello");
  }, []);
  console.log(polls, "---");
  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "2rem" }}>
        <Card style={{ width: "25vw" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>HEADING</Card.Title>
          </Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Form.Check type={"checkbox"} label={"option1"} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check type={"checkbox"} label={"option2"} />
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Check type={"checkbox"} label={"option3"} />
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  );
};
export default Polling;
