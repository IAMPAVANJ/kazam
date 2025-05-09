import { Toaster } from 'react-hot-toast';
import './App.css';
import ReactRoutes from './Routes/Routes'

function App() {

  return (
    <div>
      <ReactRoutes />
      <Toaster position="top-center"/>
    </div>
  );
}

export default App
