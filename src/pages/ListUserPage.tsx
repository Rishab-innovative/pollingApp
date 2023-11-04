import { ListGroup, Spinner } from "react-bootstrap";
import { userList } from "../redux/ListUserSlice";
import { useState } from "react";
import { useEffect } from "react";
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
  limit: number | null;
  page: number | null;
}

const ListUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const userListData = useSelector((state: RootState) => state.userList);

  const [pageInfo, setPageInfo] = useState<pageInfoType>({
    limit: null,
    page: null,
  });
  useEffect(() => {
    dispatch(
      userList({
        limit: 10,
        page: 1,
      })
    );
  }, []);
  console.log("listUser style in everyLine", userListData.data);
  return (
    <>
      {userListData.data.map((item: any) => (
        <ListGroup horizontal className="my-2">
          <ListGroup.Item>
            {item.firstName}
            {item.lastName}
          </ListGroup.Item>
          <ListGroup.Item>{item.email}</ListGroup.Item>
          <ListGroup.Item>
            {item.roleId === ROLE_ADMIN_ID
              ? ROLE_ADMIN_NAME
              : item.roleId === ROLE_USER_ID
              ? ROLE_USER_NAME
              : ROLE_HR_NAME}
          </ListGroup.Item>
        </ListGroup>
      ))}
    </>
  );
};
export default ListUserPage;
// let userRole="";
//         if(item.roleId===1){
//           userRole="admin";
//         }
//         else if(item.roleId===2){
//           userRole="User";
//         }
//         else{
//           userRole="HR";
//         }
