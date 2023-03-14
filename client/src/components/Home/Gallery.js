import React from 'react';
import Product from './Product'
import Pagination from './Pagination'

const Results = ({ items, pageIndex }) => !!items.length && items[pageIndex].map(product => <Product key={product.id} {...product}/>)
const Empty = ({ isVisible }) => !isVisible && <p style={{marginLeft: 18, fontSize: 18}}>No Listing available ... </p>
const Loading = ({ isLoading }) => isLoading && <p style={{marginLeft: 18, fontSize: 18}}>Loading... </p>

const Gallery = () => { 
	// fetch products
	return (
	<>
		<section className="mt-3 mb-5">
			<header className="section-heading mb-5">
				<h3 className="title-section">Products</h3>
			</header>
			<div className="row">
					{/* Listing */}
			</div> 
			<div className="clearfix"></div>
		</section>
		<Pagination />
	</>
	)
}
export default Gallery