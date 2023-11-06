import { Spinner } from "react-bootstrap";
import { userList } from "../redux/ListUserSlice";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  ROLE_ADMIN_ID,
  ROLE_USER_ID,
  ROLE_HR_NAME,
  ROLE_USER_NAME,
  ROLE_ADMIN_NAME,
} from "../config";
import { AppDispatchType, RootState } from "../redux/Store";
interface pageInfoType {
  limit: number;
  page: number;
}
const ListUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const userListData = useSelector((state: RootState) => state.userList);
  const [pageInfo, setPageInfo] = useState<pageInfoType>({
    limit: 10,
    page: 1,
  });
  useEffect(() => {
    dispatch(
      userList({
        limit: pageInfo.limit,
        page: pageInfo.page,
      })
    );
  }, [pageInfo]);
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageInfo({
      ...pageInfo,
      limit: parseInt(event.target.value, 10),
    });
  };
  const handleNextPageChange = () => {
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      page: prevPageInfo.page + 1,
    }));
  };
  const handlePrevPageChange = () => {
    if (pageInfo.page === 1) return;
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      page: prevPageInfo.page - 1,
    }));
  };
  const handlePageNumber = (e: any) => {
    const pageNumber = parseInt(e.target.innerText, 10);
    setPageInfo({
      ...pageInfo,
      page: pageNumber,
    });
  };
  return (
    <>
      {userListData.isLoading === true ? (
        <div className="spinner circle">
          <Spinner
            animation="border"
            variant="success"
            className="polling-spinner"
          />
        </div>
      ) : (
        <>
          {userListData.data.length < pageInfo.limit ? (
            <p>NO USERS LEFT TO DISPLAY...GO BACK TO PEVIOUS PAGES</p>
          ) : (
            <Table size="lg" responsive="xl">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email-Id</th>
                  <th>User Role</th>
                </tr>
              </thead>
              {userListData.data.map((item: any) => (
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      {item.firstName}
                      {item.lastName}
                    </td>
                    <td>{item.email}</td>
                    <td>
                      {item.roleId === ROLE_ADMIN_ID
                        ? ROLE_ADMIN_NAME
                        : item.roleId === ROLE_USER_ID
                        ? ROLE_USER_NAME
                        : ROLE_HR_NAME}{" "}
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          )}
          <div className="viewUser-footer">
            <span>
              <Pagination>
                <Pagination.Prev onClick={handlePrevPageChange} />
                <Pagination.Item active onClick={handlePageNumber}>
                  {pageInfo.page}
                </Pagination.Item>
                <Pagination.Item onClick={handlePageNumber}>
                  {pageInfo.page + 1}
                </Pagination.Item>
                <Pagination.Item onClick={handlePageNumber}>
                  {pageInfo.page + 2}
                </Pagination.Item>
                <Pagination.Next onClick={handleNextPageChange} />
              </Pagination>
            </span>
            <span>
              <Form.Select onChange={handleSelect} id="id">
                <option>Numbers of Users To Display:-{pageInfo.limit}</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
              </Form.Select>
            </span>
          </div>
        </>
      )}
    </>
  );
};
export default ListUserPage;
