import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Store } from 'redux';
import React from 'react';
import initializeStore from './store';

function App() {
	const [store, setStore] = React.useState<Store>();

	React.useEffect(() => {
		const start = async () => {
			const preparedStore = await initializeStore();
			setStore(preparedStore);
		};

		start();
	}, []);

	if (!store) return <></>;
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
