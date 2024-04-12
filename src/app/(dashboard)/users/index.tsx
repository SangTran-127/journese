"use client";

import { Button, Card } from "react-bootstrap";
import React from "react";
import { newResource, Resource } from "@/models/resource";
import { Pokemon } from "@/models/pokemon";
import useSWRAxios, { transformResponseWrapper } from "@/hooks/useSWRAxios";
import Pagination from "@/components/Pagination/Pagination";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import UserList from "@/components/User/UserList";
import { User } from "@/models/user";

export type Props = {
  props: {
    userResource: Resource<User>;
    page: number;
    perPage: number;
    sort: string;
    order: string;
  };
};

export default function Index(props: Props) {
  const {
    props: { userResource, page, perPage, sort, order },
  } = props;

  const router = useRouter();

  const userListURL = `${process.env.BACKEND_API}user` || "";

  // swr: data -> axios: data -> resource: data
  const {
    data: { data: resource },
  } = useSWRAxios<Resource<User>>(
    {
      url: userListURL,
      params: {
        _page: page,
        _limit: perPage,
        _sort: sort,
        _order: order,
      },
      transformResponse: transformResponseWrapper((d: Pokemon[], h) => {
        const total = h ? parseInt(h["x-total-count"], 10) : 0;
        return newResource(d, total, page, perPage);
      }),
    },
    {
      data: userResource,
      headers: {
        "x-total-count": userResource.meta.total.toString(),
      },
    }
  );

  return (
    <Card>
      <Card.Header>Users</Card.Header>
      <Card.Body>
        <UserList users={resource.data} />
        <Pagination meta={resource.meta} />
      </Card.Body>
    </Card>
  );
}
