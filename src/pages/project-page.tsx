import { useState, useEffect } from "react";
import { ProjectTableComponent } from "../components/project-page/project-table-component.tsx";
import {ProjectNavigationComponent} from "../components/project-page/project-navigation-component.tsx";
import {SearchIcon} from "lucide-react";
import '../styles/project-page/project-page.css';

export const ProjectPage = () => {
    const [search, setSearch] = useState("");
    useEffect(() => {
        document.title = 'Проекты'
    }, []);

    return (
        <div>
            <div style={{ marginTop: "10px"}}>
                <ProjectNavigationComponent />
            </div>

            <div className="search-container" >
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="project-search-input"
                />
                <SearchIcon className="search-icon" size={18} />
            </div>
            <ProjectTableComponent search={search} />
        </div>
    );
};
