import * as React from "react";

function CurrencyRow(props: {
	currencyOptions: string[];
	selectedCurrency: string;
	onChangeCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	onChangeAmount: (e: React.ChangeEvent<HTMLInputElement>) => void;
	amount: number;
}) {
	const {
		currencyOptions,
		selectedCurrency,
		onChangeCurrency,
		onChangeAmount,
		amount,
	} = props;
	return (
		<div>
			<input
				type="number"
				className="currencyInput"
				value={amount}
				onChange={onChangeAmount}
			/>
			<select value={selectedCurrency} onChange={onChangeCurrency}>
				{currencyOptions.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

export default CurrencyRow;
