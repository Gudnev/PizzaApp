// Импорт функции forwardRef из React — она позволяет пробросить ref внутрь дочернего элемента
import { forwardRef } from 'react';

// Импорт локальных стилей из CSS-модуля
import styles from './Input.module.css';

// Импорт библиотеки classnames (cn) — для удобного объединения классов
import cn from 'classnames';

// Импорт интерфейса пропсов для компонента Input
import { InputProps } from './Input.props';

// Создаём компонент Input, используя forwardRef (чтобы родитель мог получить доступ к <input>)
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	{ isValid = true, className, ...props }, // Деструктуризация пропсов: isValid по умолчанию true
	ref // Сюда попадёт ссылка (ref), если она передаётся извне
) {
	return (
		<input
			ref={ref} // Пробрасываем ссылку в HTML-элемент
			// Собираем CSS-классы:
			// - основной стиль input
			// - дополнительный класс, если передан
			// - класс invalid, если isValid === false
			className={cn(
				styles['input'],
				className,
				{
					[styles['invalid']]: !isValid // ⬅️ исправлена логика: invalid — если НЕ валидно
				}
			)}
			{...props} // Пробрасываем все остальные HTML-пропсы (type, placeholder, onChange и т.д.)
		/>
	);
});

// Экспорт компонента по умолчанию
export default Input;