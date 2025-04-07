import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { jobAtom, networkAtom, notificationAtom } from "../atoms/atom";

const RecoilButtons = () => {
  const [networkNotificationCount, setNetworkNotificationCount] =
    useRecoilState(networkAtom);
  const jobNotificationCount = useRecoilValue(jobAtom);
  const notificationCount = useRecoilValue(notificationAtom);
  const finalValue =
    networkNotificationCount >= 100 ? "99+" : networkNotificationCount;
  return (
    <>
      <button>Home</button>
      <button>My Network ({finalValue})</button>
      <button>Jobs ({jobNotificationCount})</button>
      <button>Notiification({notificationCount})</button>

      <button
        onClick={() =>
          setNetworkNotificationCount(networkNotificationCount + 1)
        }
      >
        Me
      </button>
    </>
  );
};

export default RecoilButtons;
