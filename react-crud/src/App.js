import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TaskList from "./components/task-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar/>
        <Route path="/" exact component={TaskList}></Route>
        <Route path="/edit/:id" component={EditTask}></Route>
        <Route path="/create" component={CreateTask}></Route>
        <Route path="/user" component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
