import { Router } from './Router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import { getDate } from './lib/date'

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
            'created_at': new Date(),
        },
        {
            'title': 'Test 2',
            'description': 'Description 2',
            'status': 'Closed',
            'created_at': new Date(),
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
                'created_at': new Date(),
            }
        )
        updateTasks(new_tasks);
    }
    const deleteTask = (id) => {
        let new_tasks = tasks.slice();
        new_tasks.splice(id, 1);
        updateTasks(new_tasks);
    }
    const [filters, updateFilters] = useState({
        search: '',
        date: null,
        status: null,
    })
    const changeFilters = (filter) => {
        let newFilters = {
            ...filters
        }
        newFilters[filter.key] = filter.value;
        updateFilters(newFilters)
    }
    const filteredData = () => {
        let tasksArray = tasks;
        if (filters.search) {
            tasksArray = tasksArray.filter((item) => {
                if (item.title.includes(filters.search) || item.description.includes(filters.search)) return true
                return false
            })
        }
        if (filters.date) {
            tasksArray = tasksArray.filter((item) => {
                if (getDate(item.created_at) === getDate(filters.date)) return true
                return false
            })
        }
        if (filters.status) {
            tasksArray = tasksArray.filter((item) => {
                if (item.status === filters.status) return true
                return false
            })
        }
        return tasksArray
    }
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <Router tasks={filteredData} changeTaskStatus={changeTaskStatus} createTask={createTask} deleteTask={deleteTask} changeFilters={changeFilters}/>
    </ThemeProvider>
  );
}

export default App;
