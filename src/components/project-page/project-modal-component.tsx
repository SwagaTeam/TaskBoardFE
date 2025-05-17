import { useState } from "react";
import "../../styles/project-page/project-modal.css";

type Project = {
    key: string;
    name: string;
    description: string;
    isPrivate: boolean;
    startDate: string;
    expectedEndDate: string;
    priority: number;
};

type Props = {
    onClose: () => void;
    onCreated: () => void;
};

const ProjectModalComponent: React.FC<Props> = ({ onClose, onCreated }) => {
    const [form, setForm] = useState<Project>({
        key: "",
        name: "",
        description: "",
        isPrivate: false,
        startDate: "",
        expectedEndDate: "",
        priority: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");

            const fullForm = {
                ...form,
                priority: Number(form.priority),
                startDate: new Date(form.startDate).toISOString(),
                expectedEndDate: new Date(form.expectedEndDate).toISOString(),
            };

            const response = await fetch("/api/project/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "text/plain",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(fullForm),
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            onCreated();
            onClose();
        } catch (err) {
            console.error("Ошибка при создании проекта:", err);
        }
    };

    return (
        <div className="project-modal-backdrop">
            <div className="project-modal">
                <h2>Создать проект</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" placeholder="Название" value={form.name} onChange={handleChange} required />
                    <textarea name="description" placeholder="Описание" value={form.description} onChange={handleChange} />
                    <label>
                        <input type="checkbox" name="isPrivate" checked={form.isPrivate} onChange={handleChange} />
                        Приватный
                    </label>
                    <input type="date" name="startDate" value={form.startDate} onChange={handleChange} required />
                    <input type="date" name="expectedEndDate" value={form.expectedEndDate} onChange={handleChange} required />
                    <input type="number" name="priority" value={form.priority} onChange={handleChange} min={0} />

                    <div className="modal-buttons">
                        <button type="submit">Создать</button>
                        <button type="button" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectModalComponent;
