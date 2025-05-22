// Импортируем React-хук forwardRef, который позволяет пробросить ссылку (ref) к <input>
import { forwardRef } from 'react';

// Импорт локальных CSS-модулей для стилизации
import styles from './Search.module.css';

// Импорт библиотеки classnames — для объединения нескольких CSS-классов
import cn from 'classnames';

// Импорт типа пропсов для компонента Search
import { SearchProps } from './Search.props';

// Объявляем компонент Search как функцию с пробросом ref внутрь <input>
// Тип ref — HTMLInputElement, пропсы — SearchProps
const Search = forwardRef<HTMLInputElement, SearchProps>(function Search(
	{ isValid = true, className, ...props }, // деструктурируем пропсы: isValid по умолчанию true
	ref // получаем ref, если передан родительским компонентом
) {
	return (
		// Обёртка вокруг поля ввода и иконки
		<div className={styles['input-wrapper']}>

			{/* Поле ввода */}
			<input
				ref={ref} // прикрепляем ссылку к input
				// Собираем классы:
				// - базовый стиль input
				// - внешний className, если был передан
				// - класс invalid, если поле невалидно (isValid === false)
				className={cn(
					styles['input'],
					className,
					{
						[styles['invalid']]: !isValid // ✅ исправлено: класс 'invalid' добавляется только при isValid === false
					}
				)}
				{...props} // передаём все стандартные пропсы, например: value, onChange, placeholder и т.д.
			/>

			{/* Иконка лупы справа от поля ввода */}
			<img
				className={styles['icon']}
				src="/search-icon.svg"
				alt="Иконка лупы"
			/>
		</div>
	);
});

// Экспортируем компонент по умолчанию
export default Search;