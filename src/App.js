import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import { Home } from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Invalid from './components/Invalid';
import Addtask from './components/Addtask';
import RemoveTask from './components/RemoveTask';
import EditTask from './components/EditTask';


function App() {
  return (
      <div className='container-fluid'>
        <BrowserRouter>
          <header>
            <h1 className='text-white text-center'>Todo</h1>
            <p className='text-white text-center  fs-4 fw-bold'>Your Appointments</p>
          </header>
          <section className='mt-4'>
            <div>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='dashboard' element={<Dashboard />} />
                <Route path='invalid' element={<Invalid />} />
                <Route path='add-task' element={<Addtask />} />
                <Route path='delete-task/:id' element={<RemoveTask />} />
                <Route path='edit-task/:id' element={<EditTask />} />
              </Routes>
            </div>
          </section>
        </BrowserRouter>
      </div>
  );
}

export default App;
