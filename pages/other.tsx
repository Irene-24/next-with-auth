import React from "react";
import Link from "next/link";

const Other = () => {
  return (
    <div className="p-3">
      <p>Open route</p>
      <br />
      <Link href="/admin">
        <a>Admin</a>
      </Link>
      <br />
    </div>
  );
};

export default Other;
