import { LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { kickUser } from "../utils/userHandler";
import { Avatar, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";

const menuStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
};

const menuLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    padding: "8px 15px",
    borderRadius: "5px",
    transition: "background 0.3s ease, color 0.3s ease",
};



const logoutButtonStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "none",
    border: "none",
    fontSize: "16px",
    color: "#d9534f",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
};

const Header = () => {
    const navigate = useNavigate()
    const { admin } = useSelector((state: RootState) => state.admin);

    const handleLogout = () => {
        kickUser()
    };

    const handleNavigation = (path: string) => {
        if (window.location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#0E0E55",
                color: "#ffffff",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                borderBottom: "1px solid #ddd",
                zIndex: 1000,
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <nav>
                <ul style={menuStyle}>
                    <li>
                        <button style={menuLinkStyle} onClick={() => handleNavigation("/users_list")}>
                            Users List
                        </button>
                    </li>
                    <li>
                        <button style={menuLinkStyle} onClick={() => handleNavigation("/page2")}>
                            Page 2
                        </button>
                    </li>
                    <li>
                        <button style={menuLinkStyle} onClick={() => handleNavigation("/page3")}>
                            Page 3
                        </button>
                    </li>
                    <li>
                        <button style={menuLinkStyle} onClick={() => handleNavigation("/page4")}>
                            Page 4
                        </button>
                    </li>

                </ul>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginRight: "55px" }}>
                <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
                    {admin?.name?.charAt(0)}
                </Avatar>
                <p style={{ margin: 0 }}>{admin?.name}</p>

                <button
                    style={logoutButtonStyle}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#b52b27")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "#d9534f")}
                    onClick={handleLogout}
                >
                    <Tooltip placement="bottom" title="Logout" color={"red"}>
                        <LogOut size={20} />
                    </Tooltip>
                </button>
            </div>
        </header>
    );
};

export default Header;
