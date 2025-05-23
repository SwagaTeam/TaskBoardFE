/**
 * Форматирует дату в формат 'D MMM' (например: '16 окт')
 * @param dateString - Дата в любом ISO-формате (например: '2025-05-19T12:59:08.502Z')
 * @returns Отформатированная дата в виде 'D MMM'
 */
export const formatDateToDayMonth = (dateString: string): string => {
    const date = new Date(dateString);

    // Проверка на валидность объекта Date
    if (isNaN(date.getTime())) {
        throw new Error('Передана некорректная дата');
    }

    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');

    return `${day} ${month}`;
};

export const getTaskPriorityColor = (priority: number): string => {
    switch (priority) {
        case 0:
            return '#8ed380';
        case 1:
            return '#136a00';
        case 2:
            return '#b18403';
        case 3:
            return '#aa1515';
        case 4:
            return '#870000';
        default:
            return 'none';
    }
};
