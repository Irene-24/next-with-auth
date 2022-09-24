import React from "react";
import Link from "next/link";
import Logout from "../Logout";

const Admin = () => {
  return (
    <div className="p-3">
      <h1>Admin route</h1>

      <Link href="/other">
        <a>Unprotected</a>
      </Link>

      <br />

      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      <br />

      <Logout />
    </div>
  );
};

export default Admin;
