import React from "react";
import Link from "next/link";
import Logout from "../Logout";

const Dashboard = () => {
  return (
    <div className="p-2">
      <p>Is protected - Dashboard</p>

      <br />

      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <br />

      <Logout />
    </div>
  );
};

export default Dashboard;
