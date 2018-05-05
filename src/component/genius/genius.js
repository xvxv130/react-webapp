import React from 'react'
// import UserCard from '../usercard/usercard'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux'
import UserCard  from '../usercard/usercard'

@connect(state=>state.chatuser,{getUserList})
class Genius  extends  React.Component{
    componentDidMount(){
       this.props.getUserList('boss');
    }
    render(){
        // return  <UserCard userlist={this.state.data}></UserCard>
        // {this.props.userlist}
    
          return <UserCard userList={this.props.userList}></UserCard>
    
    }
}

export default Genius