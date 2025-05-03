/**
 * Форматирует дату из формата 'YYYY-MM-DD' в 'D MMM' (например: '16 окт')
 * @param dateString - Дата в формате 'YYYY-MM-DD'
 * @returns Отформатированная дата в виде 'D MMM' (например: '16 окт')
 */
export const formatDateToDayMonth = (dateString: string): string => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        throw new Error('Неверный формат даты. Ожидается YYYY-MM-DD');
    }

    const date = new Date(dateString);

    // Проверка на валидность объекта Date
    if (isNaN(date.getTime())) {
        throw new Error('Передана некорректная дата');
    }

    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'short' }).replace('.', '');

    return `${day} ${month}`;
};
