import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPollList } from "../redux/PollListSlice";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  Tooltip,
  LinearScale,
  Legend,
} from "chart.js";
import "../css/PollListPage.css";
import { DeletePollData } from "../redux/DeletePollSlice";
import { AppDispatchType, RootState } from "../redux/Store";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Button, Card, Form, ListGroup, Spinner } from "react-bootstrap";
import { BiExpand } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import { updateVote } from "../redux/VoteCountSlice";
interface DeletePollType {
  id: number;
  index: number;
}
interface pollDataType {
  createdAt: string;
  createdBy: number;
  id: number;
  optionList: Array<{ optionTitle: string; voteCount: number[] }>;
  title: string;
  updatedAt: string;
}
interface ChartDataType {
  labels: string[];
  datasets: [
    {
      label: string;
      data: number[];
      backgroundColor: string;
    }
  ];
}
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const PollingPage: React.FC = () => {
  const navigate = useNavigate();
  const polls = useSelector((state: RootState) => state.pollList);
  const [updateChartData, setUpdateChartData] = useState<ChartDataType>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: "",
      },
    ],
  });

  const [votedItems, setVotedItems] = useState<number>();
  const [pagenumber, setNumber] = useState<number>(1);
  const [userRole, setUserRole] = useState<number>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [pollDeleteId, setPollDeleteId] = useState<DeletePollType>({
    id: 0,
    index: 0,
  });
  const [hasVotedMap, setHasVotedMap] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [totalPolls, setTotalPolls] = useState<any>([]);
  const [displayPollChart, setDisplayPollChart] = useState(false);
  const dispatch = useDispatch<AppDispatchType>();

  useEffect(() => {
    dispatch(fetchPollList(pagenumber));
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      setUserRole(JSON.parse(userDataFromLocalStorage).roleId);
    }
  }, [pagenumber, hasVotedMap]);

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
    navigate(`/viewPoll/${id}`);
  };

  const handleDelete = (id: number, index: number) => {
    setShowDeleteModal(true);
    setPollDeleteId({
      id: id,
      index: index,
    });
  };

  const handleDeletePoll = () => {
    dispatch(DeletePollData(pollDeleteId.id));
    const deletePoll = [...totalPolls];
    deletePoll.splice(pollDeleteId.index, 1);
    setTotalPolls([...deletePoll]);
    setShowDeleteModal(false);
  };
  const handleVote = (optionId: number) => {
    setVotedItems(optionId);
  };
  const handleSubmitVote = (pollTitle: string) => {
    if (votedItems) {
      setHasVotedMap((prevHasVotedMap) => ({
        ...prevHasVotedMap,
        [pollTitle]: true,
      }));
      dispatch(updateVote(votedItems));
      localStorage.setItem(
        "VotedItems",
        JSON.stringify({ ...hasVotedMap, [pollTitle]: true })
      );
    } else {
      setHasVotedMap((prevHasVotedMap) => ({
        ...prevHasVotedMap,
        [pollTitle]: false,
      }));
      localStorage.setItem(
        "VotedItems",
        JSON.stringify({ ...hasVotedMap, [pollTitle]: false })
      );
    }
  };
  const handleEditPoll = (id: number) => {
    navigate(`/editPoll/${id}`);
  };
  useEffect(() => {
    const storedVotedItems = localStorage.getItem("VotedItems");
    if (storedVotedItems) {
      setHasVotedMap(JSON.parse(storedVotedItems));
    }
  }, []);

  const handleViewPollVoteChart = (pollData: pollDataType) => {
    const modifiedOptionList = pollData.optionList.map(
      ({ optionTitle, voteCount }) => ({ optionTitle, voteCount })
    );
    const labels = modifiedOptionList.map((items) => items.optionTitle);
    setUpdateChartData({
      labels: labels,
      datasets: [
        {
          label: pollData.title,
          data: modifiedOptionList.map((items) => items.voteCount.length),

          backgroundColor: "rgb(0, 137, 167)",
        },
      ],
    });
    setDisplayPollChart(true);
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
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header>
              <Modal.Title>Delete Poll</Modal.Title>
            </Modal.Header>
            <Modal.Body>Confirm delete this poll</Modal.Body>
            <Modal.Footer>
              <Button
                variant="success"
                onClick={() => setShowDeleteModal(false)}
              >
                Close
              </Button>
              <Button variant="danger" onClick={handleDeletePoll}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
          {totalPolls.map((item: any, index: number) => (
            <Card key={item.createdAt}>
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  {item.title}
                  {userRole === 1 ? (
                    <>
                      <AiFillEdit onClick={() => handleEditPoll(item.id)} />
                      <AiFillDelete
                        onClick={() => handleDelete(item.id, index)}
                      />
                      <BiExpand onClick={() => handleViewPoll(item.id)} />
                      <AiOutlineBarChart
                        onClick={() => handleViewPollVoteChart(item)}
                      />
                    </>
                  ) : (
                    <BiExpand onClick={() => handleViewPoll(item.id)} />
                  )}
                </Card.Title>
              </Card.Body>
              {item.optionList.map((option: any) => (
                <ListGroup variant="flush" key={option.title}>
                  <ListGroup.Item>
                    <Form.Check
                      type="radio"
                      label={option.optionTitle}
                      name={item.title}
                      disabled={hasVotedMap[item.title]}
                      onChange={() => handleVote(option.id)}
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
          <Modal
            show={displayPollChart}
            onHide={() => setDisplayPollChart(false)}
            animation={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Bar data={updateChartData} options={{ indexAxis: "y" }}></Bar>
          </Modal>
        </div>
      )}
    </>
  );
};
export default PollingPage;
