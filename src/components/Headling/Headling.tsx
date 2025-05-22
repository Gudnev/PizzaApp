// Импорт стилей из CSS-модуля. styles['h1'] будет использоваться для заголовка
import styles from './Headling.module.css';

// Импорт утилиты classnames (сокращённо `cn`) — помогает объединять несколько CSS-классов
import cn from 'classnames';

// Импорт пропсов (типизация) для компонента Headling
import { HeadlingProps } from './Headling.props';

// Объявление функционального компонента Headling с деструктуризацией props
function Headling({ children, className, ...props }: HeadlingProps) {
	return (
		// Рендерим заголовок <h1>
		// Объединяем переданный className (если есть) с локальным стилем styles.h1
		// Также передаём все остальные пропсы (например, id, onClick и т.д.)
		<h1 className={cn(className, styles['h1'])} {...props}>
			{children} {/* Внутрь помещается текст заголовка */}
		</h1>
	);
}

// Экспорт компонента по умолчанию
export default Headling;