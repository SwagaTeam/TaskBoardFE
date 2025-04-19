import {TableComponent} from "../components/tasks-page/table-component.tsx";
import {SprintInfoComponent} from "../components/tasks-page/sprint-info-component.tsx";
import {useEffect} from "react";

export const TasksPage = () => {
    useEffect(() => {
        document.title = "Задачи"
    })

    return (
        <div style={{  backgroundColor: "#141F29"}}>
            <SprintInfoComponent/>
            <TableComponent/>
        </div>
    )
}
