import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../css/AddPollPage.css";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPoll, resetSuccess } from "../redux/AddPollSlice";
import { useNavigate } from "react-router-dom";
import { getSinglePoll } from "../redux/EditPollSlice";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import {
  editPollTitle,
  editPollOptions,
  deleteSingleUserData,
} from "../redux/EditPollSlice";
import { DeleteOptionData } from "../redux/DeleteOptionSlice";

interface PollData {
  title: string;
  option: { optionTitle: string; id: number | null };
  options: { optionTitle: string; id: number | null }[];
  id: number | null;
}
interface EditedTitletype {
  title: string;
  idOfPoll: any;
  createdBy: number;
}
interface MessageError {
  titleError: boolean;
  optionError: boolean;
  optionSize: boolean;
}
const PollModal: React.FC = () => {
  const polls = useSelector((state: RootState) => state.pollList);
  const addPollInfo = useSelector((state: RootState) => state.addPoll);
  const editedPollInfo = useSelector((state: RootState) => state.editPoll);
  const [showModal, setShowModal] = useState(false);
  const singleUserInfo = editedPollInfo.singleUserData as {
    title: string;
    optionList: [];
  };
  const [addNewPollData, setAddNewPollData] = useState<PollData>({
    title: singleUserInfo.title ?? "",
    option: { optionTitle: "", id: null },
    options: singleUserInfo.optionList || [],
    id: null,
  });
  const [errorMessage, setErrorMessage] = useState<MessageError>({
    titleError: false,
    optionError: false,
    optionSize: false,
  });
  const { id } = useParams();
  const idAsNumber = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    if (addPollInfo.isSuccess === true) {
      setShowModal(true);
      dispatch(resetSuccess());
    }
  }, [addPollInfo.isSuccess]);
  useEffect(() => {
    if (editedPollInfo.titleUpdateSuccess === true) {
      setShowModal(true);
      dispatch(deleteSingleUserData());
    }
  }, [editedPollInfo.titleUpdateSuccess]);

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
      if (idAsNumber) {
        const dataOfSelectedPoll: any = polls.data.filter((data: any) => {
          return data.id === idAsNumber;
        });
        const createdBy = dataOfSelectedPoll[0].createdBy;
        const dispatchValues: EditedTitletype = {
          title: addNewPollData.title,
          idOfPoll: idAsNumber,
          createdBy: createdBy,
        };
        dispatch(editPollTitle(dispatchValues));
      } else {
        dispatch(addNewPoll(addNewPollData));
      }
    }
  };
  useEffect(() => {
    if (singleUserInfo.title) {
      setAddNewPollData((prevState) => ({
        ...prevState,
        title: singleUserInfo.title,
      }));
    }

    if (singleUserInfo.optionList) {
      setAddNewPollData((prevState) => ({
        ...prevState,
        options: singleUserInfo.optionList,
      }));
    }
  }, [singleUserInfo, dispatch]);
  useEffect(() => {
    if (!idAsNumber) return;
    dispatch(getSinglePoll(idAsNumber));
  }, []);

  const handleEdit = (index: number) => {
    const optionToEdit = addNewPollData.options[index];
    const updatedOptions = [...addNewPollData.options];
    const editedOption = {
      optionTitle: optionToEdit.optionTitle,
      id: optionToEdit.id,
    };
    updatedOptions.splice(index, 1);

    setAddNewPollData({
      ...addNewPollData,
      option: editedOption,
      options: updatedOptions,
    });
  };

  const handleDeleteOption = (index: number) => {
    const updatedOptions = [...addNewPollData.options];
    if (addNewPollData.title) {
      const deleteOptionId: number | null = updatedOptions[index].id;
      dispatch(DeleteOptionData(deleteOptionId as number));
      updatedOptions.splice(index, 1);

      setAddNewPollData({
        ...addNewPollData,
        options: updatedOptions,
      });
    } else {
      updatedOptions.splice(index, 1);
      setAddNewPollData({
        ...addNewPollData,
        options: updatedOptions,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const key = e.target.id;
    if (key === "title") {
      setAddNewPollData({
        ...addNewPollData,
        title: value,
      });
      setErrorMessage({
        ...errorMessage,
        titleError: false,
      });
    } else if (key === "option") {
      setAddNewPollData({
        ...addNewPollData,
        option: { id: addNewPollData.option.id, optionTitle: value },
      });
      setErrorMessage({
        ...errorMessage,
        optionError: false,
      });
    }
  };

  const handleAddOptions = () => {
    if (addNewPollData.option.optionTitle.trim() === "") {
      setErrorMessage({
        ...errorMessage,
        optionError: true,
      });
    } else if (idAsNumber) {
      const updatedPoll = JSON.parse(JSON.stringify(addNewPollData));
      const newOption = {
        id: updatedPoll.option.id || null,
        optionTitle: updatedPoll.option.optionTitle,
      };
      dispatch(
        editPollOptions({
          pollId: idAsNumber,
          optionId: updatedPoll.option.id || null,
          optionTitle: updatedPoll.option.optionTitle,
        })
      );

      updatedPoll.options.push(newOption);
      updatedPoll.option = { optionTitle: "", id: null };
      setAddNewPollData({ ...updatedPoll });
    } else {
      const updatedArray = [
        ...addNewPollData.options,
        { optionTitle: addNewPollData.option.optionTitle },
      ];
      const newAddedOptions: any = {
        ...addNewPollData,
        options: updatedArray,
        option: { optionTitle: "" },
      };
      setAddNewPollData(newAddedOptions);
    }
  };
  const handleSuccessAddPoll = () => {
    setShowModal(false);
    navigate("/polling");
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddOptions();
    }
  };
  const handleBackButton = () => {
    dispatch(deleteSingleUserData());
    navigate("/polling");
  };
  return (
    <>
      {editedPollInfo.singleUserLoading === true ? (
        <Spinner
          animation="border"
          variant="success"
          className="polling-spinner"
        />
      ) : (
        <div className="wrapper">
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>Data Saved Successfully</Modal.Title>
            </Modal.Header>
            <Modal.Body>This will redirect you to Polling Page.</Modal.Body>
            <Modal.Footer>
              <div
                className="success-signUp-btn"
                onClick={handleSuccessAddPoll}
              >
                Ok
              </div>
            </Modal.Footer>
          </Modal>
          <div className="add-poll-container">
            <div className="form-add-title">
              <p className="add-title">Title</p>
              <Form.Control
                id="title"
                value={addNewPollData.title}
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
                  value={addNewPollData.option.optionTitle}
                  placeholder="Enter Option"
                  onKeyPress={handleKeyPress}
                />
                <InputGroup.Text>
                  <AiOutlinePlus onClick={handleAddOptions} />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <div className="TotalOptionList">
              {addNewPollData.options.map((item: any, index: number) => (
                <span className="displayOptions" key={index}>
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
              {addPollInfo.isLoading === true ? (
                <button disabled={true} className="addPoll-submit-btn">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </button>
              ) : (
                <button className="addPoll-submit-btn" onClick={handleSubmit}>
                  Submit
                </button>
              )}
              <button className="addPoll-submit-btn" onClick={handleBackButton}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PollModal;
