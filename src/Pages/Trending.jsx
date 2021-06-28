import React, { useState, useEffect } from 'react';
import CustomPagination from '../Components/Pagination/CustomPagination';
import "./Trending.css"
import SingleContent from '../Components/SingleContent/SingleContent';
require('dotenv').config();



const Trending = () => {
 const [page, setPage] = useState(1);
 const [content, setContent] = useState([]);

    

	const fetchTrending = async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&with_watch_monetization_types=flatrate`
		);
		const data = await res.json();

		setContent(data.results);
	};
	useEffect(() => {
		fetchTrending();
	}, [page]);

	return (
		<div>
			<span className='pageTitle'>Trending</span>
			<div className='trending'>
				{content &&
                    content.map((c) => {
                    
						return (
							<SingleContent
								id={c.id}
								poster={c.poster_path}
								title={c.title || c.name}
								date={c.first_air_date || c.release_date}
								media_type={c.media_type}
								vote_average={c.vote_average}
							/>
						);
					})}
			</div>
			<CustomPagination setPage={setPage}/>
		</div>
	);
};
export default Trending;
