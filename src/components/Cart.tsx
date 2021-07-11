import React, { createRef } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import styles from './Card.module.css';

import { AppStateContext } from './State';

interface Props {}

interface State {
	isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
	//private property with # as an indicator
	#containeRef: React.RefObject<HTMLDivElement>;
	constructor(props: Props) {
		super(props);
		this.state = {
			isOpen: false,
		};
		this.#containeRef = createRef();
		// this.handleClick = this.handleClick.bind(this);
	}

	handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// console.log(e.target);
		// if ((e.target as HTMLElement).nodeName === 'SPAN') {
		// 	(e.target as HTMLSpanElement).style.color = 'red';
		// }
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
		}));
	};

	handleOutsideClick = (e: MouseEvent) => {
		if (
			this.#containeRef.current &&
			!this.#containeRef.current.contains(e.target as Node)
		) {
			this.setState({ isOpen: false });
		}
	};

	componentDidMount() {
		document.addEventListener('mousedown', this.handleOutsideClick);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleOutsideClick);
	}

	render() {
		return (
			<AppStateContext.Consumer>
				{(state) => {
					const qtyItems = state.cart.items.reduce(
						(acc, currentValue) => {
							return acc + currentValue.quantity;
						},
						0
					);
					return (
						<div
							className={styles.cartContainer}
							ref={this.#containeRef}
						>
							<button
								type='button'
								className={styles.button}
								onClick={this.handleClick}
							>
								<FiShoppingCart />{' '}
								<span>
									{qtyItems} pizzas £
									{state.cart.totalPrice.toFixed(2)}
								</span>
							</button>
							<div
								className={styles.cartDropDown}
								style={{
									display: this.state.isOpen
										? 'block'
										: 'none',
								}}
							>
								<ul>
									{state.cart.items.map((item) => (
										<li key={item.id}>
											{item.name} &times; {item.quantity}
										</li>
									))}
								</ul>
							</div>
						</div>
					);
				}}
			</AppStateContext.Consumer>
		);
	}
}

export default Cart;
