import { UserProvider } from './context/UserContext';
import { Global } from './global/globalStyle';
import Routes from './routes';

function App() {
  return (
    <UserProvider>
      <Global />
      <Routes />
    </UserProvider>
  );
}

export default App;
