import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext';

import { Global } from './global/globalStyle';
import Routes from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <UserProvider>
      <Global />
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </UserProvider>
  );
}

export default App;
