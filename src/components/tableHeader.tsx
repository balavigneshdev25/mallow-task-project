import React, { useEffect, useState } from "react";
import { Input, Button, Space } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setUsers } from "../slice/userSlice";

interface UsersListProps {
    title: string;
    onCreate: () => void;
    buttonName: string,
    getUserData: () => void,
    page: number,
    per_page: number
}

const TableHeader: React.FC<UsersListProps> = ({ title, onCreate, buttonName, getUserData, page, per_page }) => {
    const dispatch = useDispatch();
    const { users } = useSelector((state: RootState) => state.users);

    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSearchText("")
    }, [page, per_page])

    const handleSearch = () => {
        let search = searchText.toLowerCase()
        if (!searchText) {
            getUserData()
        }
        const filtered = users.filter(
            (user) =>
                user.first_name.toLowerCase().includes(search) ||
                user.last_name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search)
        );
        dispatch(setUsers({ users: filtered, total: filtered.length }))

    };

    const handleClear = () => {
        if (searchText) {
            getUserData()
        }
        setSearchText("")
    }
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p>{title}</p>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Space.Compact>
                    <Input
                        placeholder="Enter search text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        size="small"
                        suffix={
                            <CloseOutlined
                                onClick={handleClear}
                                style={{ cursor: "pointer", color: "#999", fontSize: "12px" }}
                            />
                        }
                    />
                    <Button onClick={handleSearch} icon={<SearchOutlined />} size="small" />
                </Space.Compact>
                <Button size="small" type="primary" onClick={onCreate}>
                    {buttonName}
                </Button>
            </div>
        </div>
    );
};

export default TableHeader;
