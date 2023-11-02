// import { ButtonCard, ListGroup, Spinner } from "react-bootstrap";
import { Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppDispatchType, RootState } from "../redux/Store";
import { useParams } from "react-router-dom";
import { getSinglePoll } from "../redux/EditPollSlice";

const ViewPollPage = () => {
  const dispatch = useDispatch<AppDispatchType>();

  const { id } = useParams();
  const idAsNumber = id ? parseInt(id, 10) : 0;

  useEffect(() => {
    dispatch(getSinglePoll(idAsNumber));
  }, [idAsNumber]);

  const loadingState: any = useSelector((state: RootState) => state.editPoll);
  const singleUserInfo: any = useSelector(
    (state: RootState) => state.editPoll.singleUserData
  );
  return (
    <>
      <div className="viewPoll-container">
        {loadingState.singleUserSuccess === false ? (
          <Spinner
            animation="border"
            variant="success"
            className="polling-spinner"
          />
        ) : (
          <Card style={{ width: "fit-content", textAlign: "center" }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {singleUserInfo.title}
              </Card.Title>
            </Card.Body>
            {singleUserInfo.optionList &&
              singleUserInfo.optionList.map((option: any) => (
                <ListGroup variant="flush" key={option.title}>
                  <ListGroup.Item>{option.optionTitle}</ListGroup.Item>
                </ListGroup>
              ))}
          </Card>
        )}
      </div>
    </>
  );
};
export default ViewPollPage;
