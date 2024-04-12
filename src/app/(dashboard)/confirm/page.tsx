import Image from "next/image";
import Link from "next/link";
import React from "react";

const ConfirmPage = async () => {
  const res = await fetch(`http://localhost:3052/api/v1/confirm/all`, {
    cache: "no-cache",
  });
  const { metadata } = (await res.json()) as Array<any>;
  return (
    <div>
      {metadata
        .filter((confirm: any) => confirm.status === "pending")
        .map((confirm: any) => (
          <div className="border">
            <div className="d-flex justify-between justify-content-between gap-3">
              <div className="d-flex align-items-center gap-3">
                <div className="">{confirm._id}</div>
                <div>
                  <Image
                    alt={confirm.avatarUrl}
                    src={confirm.avatarUrl}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className={
                    confirm.status === "pending"
                      ? "btn btn-warning"
                      : "btn btn-danger"
                  }
                >
                  {confirm.status}
                </div>
              </div>
              <div className="d-flex align-items-center m-3">
                <Link className="btn btn-info" href={`confirm/${confirm._id}`}>
                  View Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ConfirmPage;
