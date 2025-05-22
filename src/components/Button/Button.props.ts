// Импорт:
// - ButtonHTMLAttributes — все стандартные атрибуты, которые можно использовать на <button>
// - ReactNode — любой допустимый React-контент (текст, элементы и т.п.)
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Объявление интерфейса пропсов для компонента Button
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode; // То, что будет находиться внутри кнопки (например, текст или иконка)

	appearence?: 'big' | 'small'; 
	// Необязательный проп (с "?" — значит можно не передавать)
	// Позволяет задать внешний вид кнопки: либо "big", либо "small"
}