import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';


function App() {
  if (!store) return <></>;

  return (
    <Provider store={store}>
      <BrowserRouter>
          <Routes />
      </BrowserRouter>
    </Provider>
  )
}

export default App
