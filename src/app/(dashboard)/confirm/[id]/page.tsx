import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const ConfirmDetailPage = async ({ params }: { params: { id: string } }) => {
  const res = await fetch(`http://localhost:3052/api/v1/confirm/${params.id}`);
  const { metadata } = await res.json();
  const {
    _id,
    status,
    phone,
    firstName,
    lastName,
    email,
    dob,
    citizen_id,
    citizen_images,
    createdAt,
    updatedAt,
  } = metadata;

  const submitApproved = async (data: FormData) => {
    "use server";
    const id = data.get("id");

    const response = await fetch(
      "http://localhost:3052/api/v1/confirm/approved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Send data as JSON
        },
        body: JSON.stringify({ id }),
        cache: "no-cache",
      }
    );
    if (response.ok) {
      redirect("/confirm");
    }
  };

  return (
    <div className="d-flex justify-content-between w-100">
      <form action={submitApproved}>
        <div className="">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">User Image</div>
                <div className="card-body">
                  <ul>
                    {citizen_images.length > 0 && (
                      <li className="list-group-item">
                        <span className="fw-bold">Citizen ID Images:</span>
                      </li>
                    )}
                    {citizen_images.map((imageUrl: string, index: number) => (
                      <li className="list-group-item" key={index}>
                        <img
                          src={imageUrl}
                          alt={`Citizen ID Image ${index + 1}`}
                          className="img-fluid"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">User Details</div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="fw-bold">User ID:</span> {_id}
                      <input
                        value={_id}
                        id="id"
                        name="id"
                        className="d-none"
                        type="hidden"
                        readOnly
                      />
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Status:</span> {status}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Phone Number:</span> {phone}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Full Name:</span> {firstName}{" "}
                      {lastName}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Date of Birth:</span> {dob}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Citizen ID:</span> {citizen_id}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Created At:</span>{" "}
                      {new Date(createdAt).toLocaleDateString()}
                    </li>
                    <li className="list-group-item">
                      <span className="fw-bold">Updated At:</span>{" "}
                      {new Date(updatedAt).toLocaleDateString()}
                    </li>
                  </ul>
                  <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-info" type="submit">
                      Approve
                    </button>
                    <button className="btn btn-danger">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmDetailPage;
