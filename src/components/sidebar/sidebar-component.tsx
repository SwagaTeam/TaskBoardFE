import '../../styles/sidebar-component.css'
import defaultAvatar from "../../assets/user-avatar.webp";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type NavigationItem = {
    [key: string]: string;
};

const navigation_List: NavigationItem = {
    "Проекты": "projects",
    "Доски": "boards",
    "Задачи": "tasks",
    "Настройки": "settings",
    "История": "history",
} as const

interface SidebarComponentProps {
    avatar?: string;
    name: string;
}

export const SidebarComponent = ({ avatar = defaultAvatar, name }: SidebarComponentProps) => {
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState("boards");

    return (
        <div className='sidebar'>
            <div className="profile-info">
                <img className="profile-image" src={avatar} alt="Ваш профиль" />
                <button onClick={() => {}}>
                    {name}
                </button>
            </div>
            <div className="navigation">
                {Object.entries(navigation_List).map(([title, path]) => (
                    <button
                        key={path}
                        onClick={() => {
                            navigate(`/home/${path}`);
                            setActivePath(path);
                        }}
                        className={`nav-link ${activePath === path ? 'active' : ''}`}
                    >
                        {title}
                    </button>
                ))}
            </div>
        </div>
    )
}
