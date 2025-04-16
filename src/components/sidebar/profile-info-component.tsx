import userAvatar from '../../assets/user-avatar.webp';
import '../../styles/sidebar-component/profile-info-component.css'

interface ProfileInfoProps {
    avatar?: string;
    name?: string;
}

export const ProfileInfoComponent = ({ avatar = userAvatar, name = "Без имени"}: ProfileInfoProps) => {
    return (
        <div className="profile-info">
            <img className="profile-image" src={avatar} alt="Ваш профиль" />
            <button onClick={() => {}}>
                {name}
            </button>
        </div>
    );
}
