import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Index } from './pages/Index';
import { CreateTask } from './pages/CreateTask'

const Router = (props) => (
    <BrowserRouter>
      <Switch>
        <Route path="/create_task">
            <CreateTask createTask={props.createTask}/>
        </Route>
        <Route path="/">
          <Index tasks={props.tasks} changeTaskStatus={props.changeTaskStatus} deleteTask={props.deleteTask}/>
        </Route>
      </Switch>
    </BrowserRouter>
);

export { Router };
