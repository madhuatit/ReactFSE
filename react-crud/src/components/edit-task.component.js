import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditTask extends Component{
    constructor(props){
        super(props);
        this.onChangeTaskDesc = this.onChangeTaskDesc.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){

        axios.get('http://localhost:5000/tasks/'+ this.props.match.params.id).then(
            res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                })
            }
        ).catch((err) => {console.log(err)})

        axios.get('http://localhost:5000/users/').then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user=>user.username),
                    
                 })
            }
        }).catch((error) => {
            console.log(error);
        })
        
    }

    onChangeUserName(e){
        this.setState({
            username: e.target.value
        })
        
    }

    onChangeTaskDesc(e){
        this.setState({
            description: e.target.value
        });
        console.log(e.target.value);
    }

    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        })
    }

    onChangeDate(e){
        this.setState({
            date: e 
        })
    }

    onSubmit(e){
        e.preventDefault();
        const createTsk = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(createTsk);

        axios.post('http://localhost:5000/tasks/update/'+this.props.match.params.id ,createTsk).then(res=> console.log(res.data))
        .catch(err=>console.log(err));
        window.location = "/";
    }

        render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select 
                        value={this.state.username}
                        onChange={this.onChangeUserName}
                        required
                        className="form-control">
                            {
                                this.state.users.map(user=>{
                                    return <option
                                    key={user}
                                    value={user}>{user}</option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Task Description: </label>
                        <input type="text"
                        required
                        value={this.state.description}
                        onChange={this.onChangeTaskDesc}
                        className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Duration (in Mins.): </label>
                        <input type="text"
                        required
                        value={this.state.duration}
                        className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker 
                            selected={this.state.date}
                            onChange={this.onChangeDate}></DatePicker>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Users Task" 
                            className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}