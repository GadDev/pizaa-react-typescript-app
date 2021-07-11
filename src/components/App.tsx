import React from 'react';
import Pizza from './Pizza';
import Cart from './Cart';
import SpecialOffer from './SpecialOffer';
import styles from './App.module.css';
import pizzas from '../data/pizzas.json';
import PizzaSVG from '../assets/svg/pizza.svg';

import AppStateProvider from './State';

const App = () => {
	const specialOfferPizza = pizzas.find((item) => item.specialOffer);
	console.log(specialOfferPizza);
	return (
		<AppStateProvider>
			<div className={styles.container}>
				<header className={styles.header}>
					<PizzaSVG width={120} height={120} />
					<h1 className={styles.siteTitle}>Delicious Pizza</h1>
					<Cart />
				</header>
				{specialOfferPizza && (
					<SpecialOffer pizza={specialOfferPizza} />
				)}
				<ul className={styles.pizzaList}>
					{pizzas
						.filter((pizza) => !pizza.specialOffer)
						.map((pizza) => (
							<Pizza key={pizza.id} pizza={pizza} />
						))}
				</ul>
			</div>
		</AppStateProvider>
	);
};

export default App;
