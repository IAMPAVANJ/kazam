import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from '../pages/Auth/login';
import Todo from '../pages/Dashboard/Todo';
import ProtectedRoute from './ProtectedRoute';


const ReactRoutes = ()=>{
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/todo" element={<Todo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}

export default ReactRoutes;