import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Index } from './pages/Index';
import { CreateTask } from './pages/CreateTask'

const Router = (props) => (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index tasks={props.tasks} changeTaskStatus={props.changeTaskStatus} deleteTask={props.deleteTask}/>} />
        <Route path="/create_task" element={<CreateTask createTask={props.createTask}/>} />
      </Routes>
    </BrowserRouter>
);

export { Router };
