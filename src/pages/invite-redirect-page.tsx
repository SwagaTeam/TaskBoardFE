import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const InviteRedirectPage = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInviteData = async () => {
            try {
                const response = await axios.get(`/api/project/invite/${token}`);
                const { projectId } = response.data;
                const authToken = localStorage.getItem('token');

                await axios.post(
                    `/api/project/invite/${token}/join`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                navigate(`/home/project/${projectId}`);
            } catch (error) {
                console.error('Ошибка при обработке приглашения', error);
                // Можно перенаправить на страницу с ошибкой
            }
        };

        if (token) {
            fetchInviteData();
        }
    }, [token, navigate]);

    return (
        <div className="loading-container">
            <p>Обработка приглашения...</p>
        </div>
    );
};
