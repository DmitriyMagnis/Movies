import { Link, Outlet } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <li>
            <Link className="App-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="App-link" to="/movies">
              Movies
            </Link>
          </li>
          <li>
            <Link className="App-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </header>
      <main className="App-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
