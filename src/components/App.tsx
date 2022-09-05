import React, { useEffect, useState } from "react";
import "../css/App.css";
import CurrencyRow from "./CurrencyRow";

const BASE_URL: string = "https://cdn.moneyconvert.net/api/latest.json";

function App() {
	const [currencyOptions, setCurrencyOptions] = useState<any[]>([]);
	const [fromCurrency, setFromCurrency] = useState<string>();
	const [toCurrency, setToCurrency] = useState<string>();
	const [exchangeRate, setExchangeRate] = useState<number>();
	const [amount, setAmount] = useState<number>(1);
	const [amountInFromCurrency, setAmountInFromCurrency] =
		useState<boolean>(true);

	let toAmount: number, fromAmount: number;
	if (amountInFromCurrency) {
		fromAmount = amount;
		toAmount = amount * exchangeRate!;
	} else {
		toAmount = amount;
		fromAmount = amount / exchangeRate!;
	}

	useEffect(() => {
		window
			.fetch(BASE_URL)
			.then((res: Response) => res.json())
			.then(
				(data: { rates: { [key: string]: number }; base?: string }) => {
					if (!data.hasOwnProperty("base")) data.base = "USD";

					const firstCurrency = Object.keys(data.rates)[0];

					setCurrencyOptions(
						[...Object.keys(data.rates)].sort((a, b) => {
							return data.rates[a] > data.rates[b] ? 1 : -1;
						})
					);
					setFromCurrency(data.base);
					setToCurrency(firstCurrency);
					setExchangeRate(data.rates[firstCurrency]);
				}
			);
	}, []);

	useEffect(() => {
		if (fromCurrency == undefined || toCurrency == undefined) return;
		window
			.fetch(BASE_URL)
			.then((res: Response) => res.json())
			.then(
				(data: { rates: { [key: string]: number }; base?: string }) => {
					setExchangeRate(
						data.rates[toCurrency] / data.rates[fromCurrency]
					);
				}
			);
	}, [fromCurrency, toCurrency]);

	function handleFromAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAmount(Number(e.target.value));
		setAmountInFromCurrency(true);
	}
	function handelToAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
		setAmount(Number(e.target.value));
		setAmountInFromCurrency(false);
	}

	return (
		<>
			<h1>Convert</h1>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={fromCurrency!}
				onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => {
					setFromCurrency(e.target.value);
				}}
				onChangeAmount={handleFromAmountChange}
				amount={fromAmount}
			/>
			<h1 className="equals">=</h1>
			<CurrencyRow
				currencyOptions={currencyOptions}
				selectedCurrency={toCurrency!}
				onChangeCurrency={(e: React.ChangeEvent<HTMLSelectElement>) => {
					setToCurrency(e.target.value);
				}}
				onChangeAmount={handelToAmountChange}
				amount={toAmount}
			/>
		</>
	);
}

export default App;
