import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../css/AddPollPage.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";

const AddPollPage: React.FC = () => {
  const [addNewPollData, setAddNewPollData] = useState({
    title: "",
    option: [],
  });
  return (
    <div className="wrapper">
      <div className="add-poll-container">
        <div className="form-add-title">
          <p className="add-title">Title</p>
          <Form.Control placeholder="Enter Title" />
        </div>
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Enter Option" />
            <AiOutlinePlus />
          </InputGroup>
        </div>
        <button className="addPoll-submit-btn">Submit</button>
      </div>
    </div>
  );
};
export default AddPollPage;
