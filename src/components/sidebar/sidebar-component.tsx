import {NavigationComponent} from "./navigation-component.tsx";
import {ProfileInfoComponent} from "./profile-info-component.tsx";
import '../../styles/sidebar-component/sidebar-component.css'

export const SidebarComponent = () => {
    return (
        <div className='sidebar'>
            <ProfileInfoComponent />
            <NavigationComponent />
        </div>
    )
}
