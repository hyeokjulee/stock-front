import useTokenStore from "../store/useTokenStore";

function DashBoard() {
  console.log("accessToken:", useTokenStore.getState().accessToken);
}

export default DashBoard;
