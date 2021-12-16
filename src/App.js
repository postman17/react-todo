import { Router } from './Router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useState} from "react";

const themeDark = createTheme({
  palette: {
    backgroundColor: "#ffffff",
  }
});

const App = () => {
    const [tasks, updateTasks] = useState([
        {
            'title': 'Test',
            'description': 'Description',
            'status': 'Active',
            'created_at': new Date().toLocaleString(),
        },
        {
            'title': 'Test 2',
            'description': 'Description 2',
            'status': 'Closed',
            'created_at': new Date().toLocaleString(),
        }
    ]);
    const changeTaskStatus = (id) => {
        let new_tasks = tasks.slice();
        new_tasks[id].status = new_tasks[id].status === 'Active' ? 'Closed' : 'Active';
        updateTasks(new_tasks);
    }
    const createTask = (title, description) => {
        let new_tasks = tasks.slice();
        new_tasks.push(
            {
                'title': title,
                'description': description,
                'status': 'Active',
                'created_at': new Date().toLocaleString(),
            }
        )
        updateTasks(new_tasks);
    }
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Router tasks={tasks} changeTaskStatus={changeTaskStatus} createTask={createTask}/>
    </ThemeProvider>
  );
}

export default App;
