import PollModal from "../components/PollModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "../redux/Store";
import { useEffect } from "react";

interface PollData {
  title: string;
  optionList: any[];
  createdBy: any;
}

const EditPollPage = () => {
  const getIdOfPoll = useSelector((state: RootState) => state.pollList);
  const polls = useSelector((state: RootState) => state.pollList);

  const [filteredData, setFilteredData] = useState<PollData[] | null>(null);
  useEffect(() => {
    getFilteredData();
  }, []);
  const getFilteredData = () => {
    const dataOfSelectedPoll: any = polls.data.filter((data: any) => {
      return data.id === getIdOfPoll.id;
    });
    setFilteredData(dataOfSelectedPoll);
  };
  console.log("fillll", filteredData);
  return (
    <div>
      {filteredData ? (
        <PollModal
          editedPollTitle={filteredData[0].title}
          editedOptionList={filteredData[0].optionList}
          createdBy={filteredData[0].createdBy}
          
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};
export default EditPollPage;
