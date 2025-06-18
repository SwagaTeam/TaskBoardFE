import { useState, useEffect } from "react";
import axios from "axios";
import '../styles/user-settings-page.css'

export const UserSettings = () => {
    const token = localStorage.getItem("token");
    const [userData, setUserData] = useState({
        email: "Нет данных",
    });
    const [isPasswordEditing, setIsPasswordEditing] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const fetchUserData = async () => {
        try {
            const response = await axios.get("/api/auth/current", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "*/*",
                },
            });

            setUserData(response.data);
        } catch (error) {
            console.error("Ошибка при получении данных пользователя:", error);
        }
    };

    const changePasswordRequest = async () => {
        try {
            const response = await axios.post(
                `/api/auth/change-password`,
                {
                    lastPassword: oldPassword,
                    newPassword: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "text/plain",
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Пароль успешно изменен!");
            setIsPasswordEditing(false);
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            console.log("Ошибка при отправке запроса: " + error.message);
        }
    };

    const handlePasswordCancel = () => {
        setIsPasswordEditing(false);
        setOldPassword("");
        setNewPassword("");
    };

    useEffect(() => {
        document.title='Настройки';
        fetchUserData();
    }, []);

    return (
        <div className="user-settings">
            <h2>Аккаунт</h2>
            <div className="settings-sect">
                {isPasswordEditing ? (
                    <div className="email-confirmation-container">
                        <div>
                            <p>Старый пароль:</p>
                            <input className="email-confirmation-input"
                                   type="password"
                                   autoComplete="off"
                                   value={oldPassword}
                                   onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Новый пароль:</p>
                            <input className="email-confirmation-input"
                                   type="password"
                                   autoComplete="off"
                                   value={newPassword}
                                   onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="email-edit-actions">
                            <button onClick={changePasswordRequest}>Подтвердить</button>
                            <button onClick={handlePasswordCancel}>Отмена</button>
                        </div>
                    </div>
                ) : (
                    <button
                        className="settings-sub-tab settings-sub-tab-password"
                        onClick={() => setIsPasswordEditing(true)}
                    >
                        <p>Пароль</p>
                        <div className="settings-go">&#8250;</div>
                    </button>
                )}
            </div>
            <div className="settings-sect-2">
                <button className="settings-sub-tab">
                    <div>
                        <span>Язык</span>
                        <p>Русский</p>
                    </div>
                    <div className="settings-go">&#8250;</div>
                </button>
                <button className="settings-sub-tab">
                    <div>
                        <span>Частые вопросы</span>
                        <p>Об операторе и услугах связи</p>
                    </div>
                    <div className="settings-go">&#8250;</div>
                </button>
            </div>
        </div>
    );
};
