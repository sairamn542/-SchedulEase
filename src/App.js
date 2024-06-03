import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoHome from './Components/TodoHome';
import TodoRegister from './Components/TodoRegister';
import TodoLogin from './Components/TodoLogin';
import TodoDashboard from './Components/TodoDashboard';
import TodoInvalid from './Components/TodoInvalid';
import TodoAddtask from './Components/TodoAddtask';

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <header>
          <h1 className='text-white text-center'>To-Do</h1>
          <p className='text-white text-center'>Your Appointments</p>
        </header>
        <section className='mt-4'>
          <div>
            <Routes>
              <Route path='/' element={<TodoHome />} />
              <Route path='register' element={<TodoRegister />} />
              <Route path='login' element={<TodoLogin />} />
              <Route path='dashboard' element={<TodoDashboard />} />
              <Route path='invalid' element={<TodoInvalid />} />
              <Route path='add-task' element={<TodoAddtask />} />
            </Routes>
          </div>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
