import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import THSort from "@/components/TableSort/THSort";
import { User } from "@/models/user";
import UserActiveType from "./UserActiveTypeLabel";

type Props = {
  users: User[];
} & Pick<Parameters<typeof THSort>[0], "setSort" | "setOrder">;

export default function UserList(props: Props) {
  const { users, setSort, setOrder } = props;

  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="id" setSort={setSort} setOrder={setOrder}>
              id
            </THSort>
          </th>
          <th aria-label="Photo">Avatar</th>
          <th>
            <THSort name="name" setSort={setSort} setOrder={setOrder}>
              Name
            </THSort>
          </th>
          <th>Phone</th>
          <th className="text-center">Create Date</th>
          <th>Status</th>
          <th aria-label="Action">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>
              <div
                className="position-relative mx-auto"
                style={{ width: "70px", height: "70px" }}
              >
                <Image
                  fill
                  style={{ objectFit: "contain" }}
                  alt={user.avatarUrl}
                  sizes="5vw"
                  src={user.avatarUrl}
                />
              </div>
            </td>
            <td>{user.firstName + " " + user.lastName}</td>
            <td>{user.phone}</td>
            <td>{new Date(user.createdAt).toUTCString()}</td>
            <td>
              <UserActiveType type={user.isActive ? "active" : "inactive"} />
            </td>
            <td>
              <Dropdown align="end">
                <DropdownToggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-black-50 shadow-none p-0"
                  id={`action-${user._id}`}
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem href={`users/${user._id}`}>Info</DropdownItem>
                  <Link href={`users/${user._id}/edit`} passHref legacyBehavior>
                    <DropdownItem>Edit</DropdownItem>
                  </Link>
                  <DropdownItem className="text-danger" href="#/action-3">
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
