import { Button } from "antd";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
  }

interface Props {
  handleEditUser: (user: User) => void;
  handleDeleteConfirmation: (user: User) => void;
}

export const GetUserTableColumns = ({ handleEditUser, handleDeleteConfirmation }: Props) => [
  {
    title: "",
    key: "avatar",
    render: (record: User) => (
      <img src={record.avatar} alt="Avatar" style={{ width: 50, borderRadius: "50%" }} />
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => <p style={{ color: "#4096ff" }}>{email}</p>,
  },
  {
    title: "First Name",
    key: "name",
    render: (record: User) => `${record.first_name}`,
  },
  {
    title: "Last Name",
    key: "name",
    render: (record: User) => `${record.last_name}`,
  },
  {
    title: "Action",
    key: "action",
    render: (_: any, record: User) => (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button type="primary" size="small" onClick={() => handleEditUser(record)}>
          Edit
        </Button>
        <Button type="primary" danger size="small" onClick={() => handleDeleteConfirmation(record)}>
          Delete
        </Button>
      </div>
    ),
  },
];
