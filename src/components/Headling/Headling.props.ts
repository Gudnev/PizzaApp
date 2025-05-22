// Импорт двух типов из React:
// - HTMLAttributes — базовые HTML-свойства для тега (например, id, onClick и т.п.)
// - ReactNode — любой React-контент: текст, элементы, фрагменты, null и т.д.
import { HTMLAttributes, ReactNode } from 'react';

// Объявление интерфейса пропсов для компонента Headling
export interface HeadlingProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode; // Обязательное содержимое тега <h1> — текст или вложенные элементы
}