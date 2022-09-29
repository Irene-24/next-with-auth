import React from "react";
import Link from "next/link";
import Logout from "../Logout";
import { useGetScreensQuery } from "../redux/services/screens";

const Admin = () => {
  const { data } = useGetScreensQuery();

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

      <hr />

      {data ? (
        <code>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </code>
      ) : null}
    </div>
  );
};

export default Admin;
