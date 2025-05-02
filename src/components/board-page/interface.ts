export interface Task {
    id: string;
    userName: string;
    userAvatar?: string;
    description: string;
    date: string;
    category: "todo" | "epics" | "in-progress" | "done";
}