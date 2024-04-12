import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlacesPage = async () => {
  const res = await fetch("http://localhost:3052/api/v1/place/page", {
    method: "POST",

    headers: {
      "Content-Type": "application/json", // Send data as JSON
    },
    body: JSON.stringify({
      userId: "",
      keySearch: "",
      tags: [],
    }),
    cache: "no-cache",
  });
  const { metadata } = await res.json();
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex">
        <input className="form-control" placeholder="search" />
      </div>
      <div>
        <div className="d-flex justify-content-between">
          <h4>Category </h4>
          <Link className="btn btn-success" href="/add-place">
            Add
          </Link>
        </div>
        {metadata.map((place) => (
          <div key={place._id}>
            <div>
              <h5 className="text-xl">{place._id}</h5>
              <div>
                {place.places.map((placeDetail: any) => (
                  <div
                    key={placeDetail._id}
                    className="d-flex gap-5 justify-content-around align-items-center"
                  >
                    <p className="">{placeDetail.name}</p>
                    <p className="">{placeDetail.type}</p>

                    <div style={{ width: "100%" }}>
                      <Image
                        src={placeDetail.images[0]}
                        alt={placeDetail.images[0]}
                        width={200}
                        height={150}
                      />
                    </div>
                    <div>
                      <button className="btn btn-info">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesPage;
