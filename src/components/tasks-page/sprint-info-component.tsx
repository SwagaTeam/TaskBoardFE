import {sprintMock} from "../../mock/tasks-mock.ts";
import '../../styles/tasks-page/sprint-info-component.css'

export interface Sprint {
    id: number;
    tasks: number;
    inProgress: number;
    done: number;
}

export const SprintInfoComponent = () => {
    return (
        <div className="sprint-info-component">
            <h2>Спринт {sprintMock.id}</h2>
            <p>{sprintMock.tasks} задач, {sprintMock.inProgress} в работе, {sprintMock.done} выполнены</p>
        </div>
    );
}
