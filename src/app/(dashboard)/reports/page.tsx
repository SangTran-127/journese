import Image from "next/image";
import Link from "next/link";
import React from "react";

const ReportPage = async () => {
  const data = await fetch(`http://localhost:3052/api/v1/report/all?type=User`);
  const res = await data.json();
  const reports = res.metadata as Array<any>;
  console.log("🚀 ~ ReportPage ~ reports:", reports);

  return (
    <div>
      {reports.map((report) => (
        <div className="border">
          <div className="d-flex justify-between justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="">{report._id}</div>
              <div>
                <Image
                  alt={report.user.avatarUrl}
                  src={report.user.avatarUrl}
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="">{report.details}</div>
            </div>
            <div className="d-flex align-items-center m-3">
              <Link className="btn btn-info" href={`reports/${report._id}`}>
                View Detail
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportPage;
