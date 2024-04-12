import React from "react";
import { newResource, Resource } from "@/models/resource";
import { SearchParams } from "@/types/next";
import Index, { Props } from "@/app/(dashboard)/users/index";
import { User } from "@/models/user";

const fetchUser = async (
  searchParams: SearchParams
): Promise<Props["props"]> => {
  const userListUrl = `${process.env.BACKEND_API}user` || "";
  let page = 1;
  if (searchParams?.page) {
    page = parseInt(searchParams.page.toString(), 10);
  }

  let perPage = 20;
  if (searchParams?.per_page) {
    perPage = parseInt(searchParams.per_page.toString(), 10);
  }

  let sort = "id";
  if (searchParams?.sort) {
    sort = searchParams.sort.toString();
  }

  let order = "asc";
  if (searchParams?.order && typeof searchParams.order === "string") {
    order = searchParams.order;
  }

  const url = new URL(userListUrl);
  url.searchParams.set("_page", page.toString());
  url.searchParams.set("_limit", perPage.toString());
  url.searchParams.set("_sort", sort);
  url.searchParams.set("_order", order);

  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  const users: User[] = data.metadata;

  const total = parseInt(res.headers.get("x-total-count") ?? "0", 10);
  const userResource: Resource<User> = newResource(users, total, page, perPage);
  return {
    userResource,
    page,
    perPage,
    sort,
    order,
  };
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const props = await fetchUser(searchParams);

  return <Index props={props} />;
}
