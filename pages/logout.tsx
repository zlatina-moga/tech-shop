import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as userService from "../services/userService";
import { logoutUser } from "../services/redux/userRedux";
import { empty } from "../services/redux/cartRedux";

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  //@ts-ignore
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    userService.logout(user.accessToken).then(() => {
      dispatch(logoutUser());
      dispatch(empty())
      router.push("/login");
    });
  }, []);
};

export default Logout;
