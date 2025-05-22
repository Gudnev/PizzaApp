// Импорт хука useLoaderData — для получения данных, загруженных через loader (в маршруте)
import { Await, useLoaderData } from 'react-router-dom';

// Импорт интерфейса Product — структура объекта товара
import type { Product } from '../../interfaces/product.interface';

// Импорт Suspense — компонент React для отображения "загрузки", пока данные не готовы
import { Suspense } from 'react';

// Основной компонент страницы Product
export function Product() {
	// Получаем данные из loader'а. Ожидается объект { data: Product }, возможно асинхронный
	const data = useLoaderData() as { data: Product };

	// Возвращаем JSX: оборачиваем в <Suspense> на случай отложенной загрузки
	return (
		<>
			{/* Пока данные загружаются, показываем "Загружаю..." */}
			<Suspense fallback={'Загружаю...'}>

				{/* Ждём, пока разрешится промис с товаром */}
				<Await resolve={data.data}>
					{/* Когда данные готовы — отображаем информацию о товаре */}
					{({ data }: { data: Product }) => (
						<>
							{/* Просто выводим имя товара (можно заменить на карточку, описание и т.п.) */}
							Product - {data.name}
						</>
					)}
				</Await>

			</Suspense>
		</>
	);
}
