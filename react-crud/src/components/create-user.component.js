import React, {Component} from 'react';
import axios from 'axios';


export default class CreateUser extends Component{

    constructor(props){
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state={
            username:'',
        }
    }

    onChangeUsername(e){
        this.setState({
            username: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user).then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }

    render(){
        return(
            <div>
                <h4>Create New User</h4>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                        className="form-control"
                        required
                        value={this.state.username}
                        onChange={this.onChangeUsername}></input>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="CreateUser" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}