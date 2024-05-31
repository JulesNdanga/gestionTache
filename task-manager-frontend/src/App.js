import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import TaskList from './pages/TaskList';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/tasks" component={TaskList} />
          <Route path="/create-task" component={CreateTask} />
          <Route path="/edit-task/:id" component={EditTask} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
