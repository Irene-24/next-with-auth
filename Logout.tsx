import React from "react";
import useLogout from "./hooks/useLogout";

const Logout = () => {
  const logout = useLogout();

  return (
    <button
      onClick={() => logout()}
      className="bg-app-purple-4 text-white 
      rounded-md
      p-2"
    >
      Logout
    </button>
  );
};

export default Logout;
