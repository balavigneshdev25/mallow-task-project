import { Card, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";

interface User {
  id: number;
  avatar: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
  handleEditUser: (user: User) => void;
  handleDeleteConfirmation: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({
  user,
  hoveredId,
  setHoveredId,
  handleEditUser,
  handleDeleteConfirmation,
}) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8} key={user.id}>
      <div
        style={{
          position: "relative",
          transition: "0.3s",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: hoveredId === user.id ? "0px 10px 30px rgba(0,0,0,0.2)" : "none",
        }}
        onMouseEnter={() => setHoveredId(user.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <Card
          hoverable
          style={{
            textAlign: "center",
            transition: "0.3s",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <img
            src={user.avatar}
            alt={user.first_name}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              marginBottom: 10,
            }}
          />
          <h3 style={{ margin: 0 }}>
            {user.first_name} {user.last_name}
          </h3>
          <p style={{ color: "gray", margin: 0 }}>{user.email}</p>
        </Card>

        {hoveredId === user.id && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(103, 4, 4, 0.23)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "0.3s",
            }}
          >
            <div style={{ display: "flex", gap: "10px", padding: "10px", borderRadius: "50px" }}>
              <div
                style={{
                  backgroundColor: "#7f11e0",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={() => handleEditUser(user)}
              >
                <EditOutlined style={{ fontSize: "18px", color: "#FFFFFF" }} />
              </div>

              <div
                style={{
                  backgroundColor: "red",
                  padding: "8px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onClick={() => handleDeleteConfirmation(user)}
              >
                <DeleteOutlined style={{ fontSize: "18px", color: "#FFFFFF" }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Col>
  );
};

export default UserCard;
