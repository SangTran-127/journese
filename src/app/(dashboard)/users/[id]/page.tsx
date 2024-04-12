import { User } from "@/models/user";
import React from "react";

interface UserInfoProps {
  params: {
    id: string;
  };
  searchParams: {};
}

async function fetchUserInfo(id: string) {
  const response = await fetch(
    `${process.env.BACKEND_API}user/admin/users/${id}`
  );
  const data = await response.json();
  return data.metadata;
}

export default async function UserInfoPage({ params: { id } }: UserInfoProps) {
  const user = await fetchUserInfo(id);
  console.log(user);
  return <div>page</div>;
}
