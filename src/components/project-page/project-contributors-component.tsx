import { useEffect, useState } from 'react';
import '../../styles/project-page/project-contributors-component.css';
import defaultAvatar from "../../assets/user-avatar.webp";
import { Send, X } from 'lucide-react';

interface User {
    id: number;
    username: string;
    imagePath: string;
    email: string;
    role: string;
}

interface ProjectContributorsProps {
    projectId: number;
}

export const ProjectContributorsComponent = ({ projectId }: ProjectContributorsProps) => {
    const [users, setUsers] = useState<User[] | null>(null);
    const [inviteOpen, setInviteOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [inviteSent, setInviteSent] = useState(false);
    const [url, setUrl] = useState('');
    const [shakeError, setShakeError] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (projectId) {
            fetch(`/api/project/get-users-in-project/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*/*',
                },
            })
                .then(response => response.json())
                .then(data => setUsers(data))
                .catch(error => console.error('Ошибка при получении участников:', error));
        }
    }, [projectId, token]);

    const sendInvite = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500); // сбрасываем эффект через 0.5 сек
            return;
        }

        fetch('/api/project/send-invite', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'text/plain',
            },
            body: JSON.stringify({ email, projectId }),
        })
            .then(res => res.ok ? res.text() : Promise.reject('Ошибка отправки'))
            .then(link => {
                setInviteSent(true);
                setInviteOpen(false);
                setEmail('');
                setUrl(link);
            })
            .catch(err => {
                console.error(err);
                setShakeError(true);
                setTimeout(() => setShakeError(false), 500);
            });
    };


    const resetInvite = () => {
        setInviteSent(false);
        setUrl('');
    };

    return (
        <div className="project-users-container">
            <ul className="user-list">
                {users?.map(user => (
                    <li key={user.id} className="user-item">
                        <img className="user-avatar" src={user.imagePath || defaultAvatar} alt="avatar" />
                        <div className="user-info">
                            <div className="user-name">{user.username} ({user.email})</div>
                            <div className="user-role">{user.role || ''}</div>
                        </div>
                    </li>
                ))}
            </ul>

            {inviteOpen && !inviteSent && (
                <div className={`invite-form`}>
                    <div className={`invite-form-input ${shakeError ? 'shake' : ''}`}>
                        <input
                            type="email"
                            placeholder="Email участника (участник должен быть зарегистрирован на платформе)"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button className="invite-form-sent-btn" onClick={sendInvite} title="Отправить"><Send size={17} /></button>
                    </div>
                    <button onClick={() => setInviteOpen(false)} title="Отменить"><X size={20} /></button>
                </div>
            )}

            {!inviteOpen && !inviteSent && (
                <button className="add-user-button" onClick={() => setInviteOpen(true)}>
                    Добавить участника
                </button>
            )}

            {inviteSent && (
                <div className="invite-message">
                    Ссылка <a href={url} target="_blank" rel="noopener noreferrer">{url}</a> была отправлена на указанный адрес
                    <button className="close-invite-message" onClick={resetInvite}><X size={16} /></button>
                </div>
            )}
        </div>
    );
};
