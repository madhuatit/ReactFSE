import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Task = props =>(
    <tr>
        <td>{props.task.username}</td>
        <td>{props.task.description}</td>
        <td>{props.task.duration}</td>
        <td>{props.task.date.substring(0, 10)}</td>
        <td><a href="#" onClick={()=> {props.deleteTask(props.task._id)}}>Delete </a>
         | <Link to={"/edit/"+props.task._id}>Edit</Link></td>
    </tr>
)


export default class TaskList extends Component{

    constructor(props){
        super(props);

        this.state = {
            tasks: []
        }

        this.deleteTask = this.deleteTask.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:5000/tasks/').then(res => {
            this.setState({
                tasks: res.data
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    taskList(){
        return this.state.tasks.map(eachTask => {
            return <Task task={eachTask} deleteTask={this.deleteTask} key={eachTask._id}/>;
        })
    }

    deleteTask(id){
        axios.delete('http://localhost:5000/tasks/'+id).then(res=>{
            console.log(res.data);
        }).catch((err)=>{});

        this.setState({
            tasks: this.state.tasks.filter(ea => ea._id != id)
        })
    }

    render(){
        return(
            <div>
                <h4>Task Details</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Task Description</th>
                            <th>Duration</th>
                            <th>Task Date</th>
                            <th>Update/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.taskList()}
                    </tbody>
                </table>
            </div>
        );
    }
}