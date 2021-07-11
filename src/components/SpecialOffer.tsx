import React from 'react';
import { Pizza } from '../types';
import styles from './SpecialOffer.module.css';
import { WithAddToCartProps } from '../hoc/AddToCart';

interface Props {
	pizza: Pizza;
}

const SpecialOffer: React.FC<Props> = ({ pizza }) => {
	return (
		<div className={styles.container}>
			<h2>{pizza.name}</h2>
			<p>{pizza.description}</p>
			<p>{pizza.price}</p>
			<WithAddToCartProps>
				{({ addToCart }) => (
					<button
						type='button'
						onClick={() =>
							addToCart({
								id: pizza.id,
								name: pizza.name,
								price: pizza.price,
							})
						}
					>
						Add to Cart
					</button>
				)}
			</WithAddToCartProps>
		</div>
	);
};

export default SpecialOffer;
