import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ContainerWithNavbarLayout } from 'src/ui/layouts/ContainerWithNavbarLayout/ContainerWithNavbarLayout'
import { Home } from './children/Home/Home';
import { Task } from './children/Task/Task'

const App = () => {
  return (
    <BrowserRouter>
        <SnackbarProvider>
            <ContainerWithNavbarLayout>
              <Switch>
                <Route path="/create_task">
                    <Task />
                </Route>
                <Route path="/edit_task/:id">
                    <Task />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
              </Switch>
            </ContainerWithNavbarLayout>
        </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
