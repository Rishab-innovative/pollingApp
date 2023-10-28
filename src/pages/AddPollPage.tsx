import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../css/AddPollPage.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPoll, resetSuccess } from "../redux/AddPollSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

interface PollData {
  title: string;
  option: string;
  options: { optionTitle: string }[];
}
interface MessageError {
  titleError: boolean;
  optionError: boolean;
  optionSize: boolean;
}
const AddPollPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [addNewPollData, setAddNewPollData] = useState<PollData>({
    title: "",
    option: "",
    options: [],
  });
  const [errorMessage, setErrorMessage] = useState<MessageError>({
    titleError: false,
    optionError: false,
    optionSize: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatchType>();
  const addPollInfo = useSelector((state: RootState) => state.addPoll);

  useEffect(() => {
    if (addPollInfo.isSuccess === true) {
      setShowModal(true);
      dispatch(resetSuccess());
    }
  }, [addPollInfo.isSuccess]);

  const handleSubmit = () => {
    if (addNewPollData.title.length < 9) {
      setErrorMessage({
        ...errorMessage,
        titleError: true,
      });
    } else if (addNewPollData.options.length < 3) {
      setErrorMessage({
        ...errorMessage,
        optionSize: true,
      });
    } else {
      dispatch(addNewPoll(addNewPollData));
    }
  };
  const handleEdit = (index: number) => {
    const optionToEdit = addNewPollData.options[index];
    console.log(optionToEdit.optionTitle, "opopo");
    setAddNewPollData({
      ...addNewPollData,
      option: optionToEdit.optionTitle,
    });
    console.log(addNewPollData.option, "tetstet");

    const updatedOptions = [...addNewPollData.options];
    updatedOptions.splice(index, 1);

    setAddNewPollData({
      ...addNewPollData,
      options: updatedOptions,
    });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...addNewPollData.options];
    updatedOptions.splice(index, 1);
    setAddNewPollData({
      ...addNewPollData,
      options: updatedOptions,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const key = e.target.id;
    setAddNewPollData({
      ...addNewPollData,
      [key]: value,
    });
    if (key === "option") {
      setErrorMessage({
        ...errorMessage,
        optionError: false,
      });
    }
  };

  const handleAddOptions = () => {
    if (addNewPollData.option.trim() === "") {
      setErrorMessage({
        ...errorMessage,
        optionError: true,
      });
    } else {
      const updatedArray = [
        ...addNewPollData.options,
        { optionTitle: addNewPollData.option },
      ];
      const newAddedOptions = {
        ...addNewPollData,
        options: updatedArray,
        option: "",
      };
      setAddNewPollData(newAddedOptions);
    }
  };
  const handleSuccessAddPoll = () => {
    navigate("/polling");
    setShowModal(false);
  };

  return (
    <div className="wrapper">
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>You have successfully Added a new Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>This will redirect you to Polling Page.</Modal.Body>
        <Modal.Footer>
          <div className="success-signUp-btn" onClick={handleSuccessAddPoll}>
            Ok
          </div>
        </Modal.Footer>
      </Modal>
      <div className="add-poll-container">
        <div className="form-add-title">
          <p className="add-title">Title</p>
          <Form.Control
            id="title"
            onChange={handleChange}
            placeholder="Enter Title"
          />
        </div>
        {errorMessage.titleError ? (
          <p style={{ color: "red" }}>Title must have 9 characters</p>
        ) : null}
        <div className="form-add-option">
          <p className="add-option">Option</p>
          <InputGroup className="mb-3">
            <Form.Control
              id="option"
              onChange={handleChange}
              value={addNewPollData.option}
              placeholder="Enter Option"
            />
            <InputGroup.Text>
              <AiOutlinePlus onClick={handleAddOptions} />
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className="TotalOptionList">
          {addNewPollData.options.map((item: any, index: number) => (
            <span className="displayOptions">
              {item.optionTitle}
              <AiFillEdit onClick={() => handleEdit(index)} />
              <AiFillDelete onClick={() => handleDeleteOption(index)} />
            </span>
          ))}
        </div>

        {errorMessage.optionError ? (
          <p style={{ color: "red" }}>Please enter a option</p>
        ) : null}
        {errorMessage.optionSize ? (
          <p style={{ color: "red" }}>add at least 3 options</p>
        ) : null}
        <div className="button-wrapper">
          <button className="addPoll-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button
            className="addPoll-submit-btn"
            onClick={() => navigate("/polling")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddPollPage;