import React, { useEffect, useState } from 'react'
import Collection from './Collection'
import './index.scss'

const cats = [
	{ name: 'Все' },
	{ name: 'Море' },
	{ name: 'Горы' },
	{ name: 'Архитектура' },
	{ name: 'Города' },
]

function App() {
	const [collections, setCollection] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [searchValue, setSearchValue] = useState('')
	const [categoryId, setCategoryId] = useState(0)
	const [page, setPage] = useState(1)

	useEffect(() => {
		setIsLoading(true)
		const category = categoryId ? `category=${categoryId}` : ''
		fetch(
			`https://652654d1917d673fd76c0900.mockapi.io/foto_collection?page=${page}&limit=3&${category}`
		)
			.then((response) => response.json())
			.then((result) => {
				setCollection(result)
			})
			.catch((error) => {
				console.warn(error)
				alert('error no response')
			})
			.finally(() => setIsLoading(false))
	}, [categoryId, page])

	return (
		<div className='App'>
			<h1>Моя коллекция фотографий</h1>
			<div className='top'>
				<ul className='tags'>
					{cats.map((el, index) => (
						<li
							onClick={() => setCategoryId(index)}
							className={categoryId === index ? 'active' : ''}
							key={el.name}
						>
							{el.name}
						</li>
					))}
				</ul>
				<input
					value={searchValue}
					onChange={(event) => setSearchValue(event.target.value)}
					className='search-input'
					placeholder='Поиск по названию'
				/>
			</div>
			<div className='content'>
				{isLoading ? (
					<h2>Loading...</h2>
				) : (
					collections
						.filter((el) => {
							return el.name.toLowerCase().includes(searchValue.toLowerCase())
						})
						.map((card, index) => (
							<Collection key={index} name={card.name} images={card.photos} />
						))
				)}
			</div>
			<ul className='pagination'>
				{[...Array(5)].map((num, i) => (
					<li
						onClick={() => setPage(i + 1)}
						className={page === i + 1 ? 'active' : ''}
					>
						{i + 1}
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
