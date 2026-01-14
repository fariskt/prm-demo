import Link from "next/link";
import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 h-full min-h-[90vh] min-w-54 flex flex-col p-4 gap-2">
      <div className="flex flex-col gap-4">
        <Link className="p-2 rounded-md" href="/dashboard">Dashbaord</Link>
        <Link className="p-2 rounded-md" href="/projects">Projects</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
