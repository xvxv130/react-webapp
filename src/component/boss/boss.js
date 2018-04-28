import React from 'react'
import axios from 'axios'
// import UserCard from '../usercard/usercard'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'



class Boss  extends  React.Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        axios.get('/user/list?type=genius')
            .then(res=>{
                 if(res.data.code === 0){
                     this.setState({data:res.data.data})
                 }   
            })
    }
    render(){
        const Header = Card.Header
		const Body = Card.Body
        console.log(this.state.data)
        // return  <UserCard userlist={this.state.data}></UserCard>
        // {this.props.userlist}
        return  (
            <WingBlank>
			<WhiteSpace></WhiteSpace>
            {this.state.data.map(v=>(console.log(v)))}
				{this.state.data.map(v=>(
					v.avatar?(<Card key={v._id}>
						<Header
							title={v.user}
							thumb={require(`../img/${v.avatar}.png`)}
							extra={<span>{v.title}</span>}
						></Header>
						<Body>
							{v.type=='boss'? <div>公司:{v.company}</div> :null}

							{v.desc.split('\n').map(d=>(
								<div key={d}>{d}</div>
							))}
							{v.type=='boss'? <div>薪资:{v.money}</div> :null}
						</Body>
					</Card>):null

				))}
			</WingBlank>
        )
    }
}

export default Boss