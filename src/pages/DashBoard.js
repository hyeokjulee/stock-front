import { useTokenStore } from "../store/tokenStore";

function DashBoard() {
  console.log("accessToken:", useTokenStore.getState().accessToken);
}

export default DashBoard;
