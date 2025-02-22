"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Dashboard() {
  const { user } = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress.emailAddress,
  });

  return (
    <div>
      <h2 className="font-md text-3xl">Workspace</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
        {fileList === undefined ? (
          [1, 2, 3, 4, 5, 6, 7].map((item, index) => (
            <div
              key={index}
              className="bg-slate-200 rounded-md h-[150px] animate-pulse"
            ></div>
          ))
        ) : fileList?.length > 0 ? (
          fileList?.map((file, index) => (
            <Link href={`/workspace/${file?.fileId}`} key={index}>
              <div className="flex p-5 shadow-md rounded-md flex-col items-center justify-center border cursor-pointer hover:scale-105 transition-all">
                <Image src={"/pdf.png"} alt="file" width={50} height={50} />
                <h2 className="mt-3 font-medium text-md">{file?.fileName}</h2>
                <h6 className="text-sm text-slate-400">
                  {file?._creationTime
                    ? new Date(file?._creationTime).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })
                    : "No D&T"}
                </h6>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex flex-col ml-64 items-center justify-center h-[70vh] lg:w-max ">
            <Image src={"/empty.svg"} alt="nothing" width={350} height={350} />
            <p className="text-gray-500 text-lg mt-4">No files found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
