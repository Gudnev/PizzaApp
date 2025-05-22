// Функция загрузки состояния из localStorage по ключу
export function loadState<T>(key: string): T | undefined {
	try {
		// Получаем строку из localStorage по ключу
		const jsonState = localStorage.getItem(key);

		// Если ничего не найдено — возвращаем undefined
		if (!jsonState) {
			return undefined;
		}

		// Парсим JSON-строку в объект и возвращаем
		return JSON.parse(jsonState);
	} catch (e) {
		// Если произошла ошибка (например, некорректный JSON) — логируем и возвращаем undefined
		console.error(e);
		return undefined;
	}
}

// Функция сохранения состояния в localStorage
export function saveState<T>(state: T, key: string) {
	// Преобразуем состояние в JSON-строку
	const stringState = JSON.stringify(state);

	// Сохраняем строку в localStorage по заданному ключу
	localStorage.setItem(key, stringState);
}
