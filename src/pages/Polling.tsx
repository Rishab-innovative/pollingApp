import React, { useEffect } from "react";
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
  const dispatch = useDispatch<AppDispatchType>();
  useEffect(() => {
    dispatch(fetchPollList());
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
                    <Form.Check type={"checkbox"} label={option.optionTitle} />
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
