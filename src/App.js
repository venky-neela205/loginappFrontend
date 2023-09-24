import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login} />
        <Route exact path="/register" Component={Register}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
