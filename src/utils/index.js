"use client";

import Actions from "@/components/dashboard/products/Actions";
import { handleRoleChange } from "@/lib/actions";
import { deleteUserById, updateUserById } from "@/lib/lib";
import { AdminPanelSettings, Person } from "@mui/icons-material";
import { Avatar, Switch } from "@mui/material";
import moment from "moment";

export const deleteProduct = async (formData) => {
  try {
    const id = formData.get("id");
    await deleteUserById(id);
    revalidatePath("/dashboard/users");
  } catch (error) {
    console.log(error);
  }
};

export const transactionsColumns = [
  {
    field: "username",
    headerName: "Username",
    flex: 1.5,
    renderCell: (params) => (
      <div className='flex items-center justify-center gap-2'>
        <Avatar
          width={90}
          height={90}
          className='object-cover rounded-full cursor-pointer bg-white'
          src={params.row?.avatar}
          alt={params.row?.username}
        />
        <h1> {params.row?.username} </h1>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <span
        className={`text-whit p-2 rounded-lg flex-1 grid place-content-center ${
          params?.row?.status === "pending"
            ? "bg-amber-500"
            : params?.row?.status === "paid"
            ? " bg-green-400"
            : "bg-red-500"
        }`}
      >
        {" "}
        {params?.row?.status}{" "}
      </span>
    ),
  },
  {
    field: "createdAt",
    headerName: "Date",
    width: 200,
    renderCell: (params) => {
      const date = moment(params?.row?.createdAt).format("MMM Do YYYY, h:mm a");
      return <div className='flex items-center justify-center'>{date}</div>;
    },
  },
  { field: "total", headerName: "Amount", flex: 1 },
  { field: "count", headerName: "Count", width: 20 },
  {
    field: "actions",
    headerName: "Delivery",
    flex: 1,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        <button className=' bg-green-400 p-2 rounded-lg'> delieverd </button>
      </div>
    ),
  },
];

export const usersColumns = [
  {
    field: "username",
    headerName: "Name",
    width: 150,
    renderCell: (params) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Avatar src={params.row.avatar} alt={params.row.username} />
        {params.row.username}
      </div>
    ),
  },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "createdAt",
    headerName: "Date",
    width: 150,
    renderCell: (params) => {
      const date = moment(params?.row?.createdAt).format("MMM Do YYYY, h:mm a");
      return <div className='flex items-center justify-center'>{date}</div>;
    },
  },
  {
    field: "role",
    headerName: "Role",
    width: 120,
    renderCell: (params) => {
      if (params.row.role === "admin") {
        return <AdminPanelSettings style={{ color: "#1976d2" }} />;
      } else {
        return <Person style={{ color: "#757575" }} />;
      }
    },
  },
  {
    field: "toggleRole",
    headerName: "Toggle Role",
    width: 150,
    renderCell: (params) => (
      <Switch
        checked={params.row.role === "admin"}
        onChange={(event) =>
          handleRoleChange(params?.row?._id, event.target.checked)
        }
      />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 170,
    renderCell: (params) => (
      <div className='flex items-center justify-center'>
        <Actions deleteAction={deleteProduct} page='products' id={params._id} />
      </div>
    ),
  },
];
