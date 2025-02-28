import { Col, Radio, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import CommonTable from "../components/table";
import Header from "../components/header";
import Card from "antd/es/card/Card";
import {  ExclamationCircleOutlined, TableOutlined, UnorderedListOutlined } from '@ant-design/icons';
import PaginationComp from "../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { deleteUserAPI, fetchUsersAPI, userDetailsAPI } from "../api/users";
import { setUsers } from "../slice/userSlice";
import UserFormModal from "../components/Modal/userFormModal";
import toast from "react-hot-toast";
import ConfirmModal from "../components/Modal/confirmModal";
import TableHeader from "../components/tableHeader";
import { errorHandler } from "../utils/errorHandling";
import { GetUserTableColumns } from "../components/columns/userColumn";
import UserCard from "../components/card/userCard";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
type ViewType = 'table' | 'card';
type ParamsType = { page: number, per_page: number }



const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const { users, total } = useSelector((state: RootState) => state.users);


  const [loading, setLoading] = useState<boolean>(true);
  const [view, setView] = useState<ViewType>('table');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [params, setParams] = useState<ParamsType>({ page: 1, per_page: 6 })
  const [formModel, setFormModel] = useState<boolean>(false)
  const [userData, setUserData] = useState<User | null>(null)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)



  const getUserData = () => {

    const { page, per_page } = params

    let reqParams = {
      page,
      per_page
    }
    fetchUsersAPI(reqParams)
      .then((data) => {
        dispatch(setUsers({ users: data?.data, total: data?.total }))
        setLoading(false)
      })
  }

  useEffect(() => {
    getUserData()
  }, [params, dispatch])

  const closeFormModal = () => {
    setUserData(null)
    setFormModel(false)
  }

  const handleEditUser = (userRow: User) => {
    userDetailsAPI(userRow?.id)
      .then(({ data }) => {
        setUserData(data)
        setFormModel(true)
      })
      .catch((error) => {
        if (error?.response) {
          errorHandler(error.response);
        } else {
          errorHandler(error);
        }
      })

  }

  const handleDeleteConfirmation = (userRow: User) => {
    setUserData(userRow)
    setDeleteModal(true)
  };



  const handleDeleteUser = () => {
    const id = userData?.id ?? 0
    deleteUserAPI(id)
      .then(() => {
        let temporaryData
        temporaryData = users.filter((user) => user.id !== id);
        dispatch(setUsers({ users: temporaryData, total: total }))
        toast.success("User Deleted Successfully");
        setUserData(null);
        setDeleteModal(false)
        // refetchData(); 
      })
      .catch((error) => {
        toast.error("Failed to delete user");
      });
  };

  const refetchData = () => {
    setParams({ ...params, page: 1 })
  }

  let RadioGroupData = [{ label: "Table", value: "table", RadioNameIcon: TableOutlined }, { label: "Card", value: "card", RadioNameIcon: UnorderedListOutlined }]

  return (
    <>
      <Header />
      <div style={{ margin: "20px", padding: '30px', display: "flex", gap: '20px', flexDirection: 'column' }}>

        <Card title={
          <TableHeader
            title="User List"
            onCreate={() => setFormModel(true)}
            buttonName={"Create"}
            getUserData={getUserData}
            page={params.page}
            per_page={params.per_page}
          />
        }
          style={{ marginTop: "50px" }}
        >

          <Radio.Group size="small" value={view} onChange={(e) => setView(e.target.value as ViewType)}>
            {RadioGroupData?.map((item, index) => {
              const { value, label, RadioNameIcon } = item
              return (
                <Radio.Button key={index} value={value}>
                  {React.createElement(RadioNameIcon)}  {label}
                </Radio.Button>
              )
            })}
          </Radio.Group>

          <div style={{ marginTop: "10px" }}>
            {
              view === "table" ? <CommonTable columns={GetUserTableColumns({ handleEditUser, handleDeleteConfirmation })} dataSource={users} loading={loading} rowKey="id" /> :
                <Row gutter={[16, 16]} justify="start">
                  {loading
                    ?
                    Array.from({ length: 8 }).map((_, index) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={index}>
                        <Card hoverable style={{ textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <Skeleton.Avatar active size={80} shape="circle" />
                          <Skeleton style={{ width: '150px' }} active paragraph={{ rows: 2 }} title={false} />

                        </Card>
                      </Col>
                    ))
                    :
                    users.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        hoveredId={hoveredId}
                        setHoveredId={setHoveredId}
                        handleEditUser={handleEditUser}
                        handleDeleteConfirmation={handleDeleteConfirmation}
                      />
                    ))}
                </Row>
            }
          </div>
        </Card>


        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <PaginationComp
            page={params.page}
            per_page={params.per_page}
            total={total}
            align="end"
            onChange={(page) => { setParams((prev) => ({ ...prev, page })); setLoading(true) }}
            onShowSizeChange={(current, size) => { setParams({ page: 1, per_page: size }); setLoading(true) }}
            showSizeChanger={true}
            pageSizeOptions={[6, 12, 24, 48]}
          />

        </div>
      </div>

      {formModel && <UserFormModal
        title={userData ? "Edit User" : "Create New User"}
        isOpen={formModel}
        onCancel={closeFormModal}
        userData={userData}
        refetchData={refetchData}
      />}
      {
        deleteModal && <ConfirmModal
          title="User Delete"
          isOpen={deleteModal}
          onCancel={() => { setUserData(null); setDeleteModal(false) }}
          onConfirm={() => handleDeleteUser()}
          content={<div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "60px",
                height: "60px",
                backgroundColor: "yellow",
                borderRadius: "50%",
              }}
            >
              <ExclamationCircleOutlined style={{ fontSize: "30px", color: "#333" }} />
            </div>
            <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginTop: "8px" }}>
              Are you sure you want to delete <b>{userData?.first_name}</b>?
            </p>
            <p style={{ fontSize: "1rem", color: "gray", marginTop: "3px" }}>
              Think twice! This action cannot be changed.
            </p>
          </div>}
        />
      }
    </>
  )

};

export default UsersPage;
