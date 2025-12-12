import { useEffect, useState } from "react";
import "./accounts.css";
import { getAdminApi } from "../../../util/api";

const AdminPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [page] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // ===== SHOW TOAST =====
    const showNotification = (title, message) => {
        const id = Date.now();
        const toast = { id, title, message };

        setNotifications(prev => [...prev, toast]);

        setTimeout(() => {
            setNotifications(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // ===== FETCH ADMIN =====
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const res = await getAdminApi();

                console.log("API ADMIN RESPONSE:", res);

                if (res.EC !== 0) throw new Error(res.EM);

                // 🔥 LẤY DATA ĐÚNG TRONG FIELD "data"
                setDataSource(res.data);

            } catch (error) {
                showNotification("Unauthorized", error.message || "Có lỗi xảy ra!");
            } finally {
                setLoading(false);
            }
        };


        fetchAdmin();
    }, []);

    return (
        <>
            {/* ===== TOAST UI ===== */}
            <div className="toast-wrapper">
                {notifications.map(n => (
                    <div key={n.id} className="toast-item">
                        <div className="toast-icon">❌</div>
                        <div className="toast-content">
                            <div className="toast-title">{n.title}</div>
                            <div className="toast-desc">{n.message}</div>
                        </div>
                        <div
                            className="toast-close"
                            onClick={() =>
                                setNotifications(prev => prev.filter(t => t.id !== n.id))
                            }
                        >
                            ✕
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== PAGE CONTENT ===== */}
            <div className="admin-container">
                <h2>ADMIN PAGE</h2>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : dataSource.length > 0 ? (
                            dataSource.map(item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <span className="role-tag">{item.role}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                                    Không có dữ liệu!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="pagination">
                    <button disabled>{"<"}</button>
                    <button className="active">{page}</button>
                    <button disabled>{">"}</button>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
