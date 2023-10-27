import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../css/AddPollPage.css";

const AddPollPage: React.FC = () => {
  return (
    <>
      <div className="add-poll-container">
        <div className="form-add-title">
          <p className="add-title">Title</p>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Enter Title" />
          </InputGroup>
        </div>
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <InputGroup className="mb-3">
            <Form.Control placeholder="Enter Option" />
          </InputGroup>
        </div>
      </div>
    </>
  );
};
export default AddPollPage;
