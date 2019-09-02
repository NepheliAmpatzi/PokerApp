import React, {Component} from 'react';
import '../.././src/App.css'

class Placeholder extends Component{
    constructor(props){
        super(props)
        this.state = {
            raiseInput: ''
        }
        this.raiseInputCb = this.raiseInputCb.bind(this);
    }

    async raiseInputCb(event){
        await this.setState({
            raiseInput: event.target.value
        })
        this.props.parentCb(this.state.raiseInput)
    }

    render(){
        return ( 
            <input 
                className={this.props.class} 
                type="number"
                npc={this.props.npc} 
                value={this.props.value}
                onChange={this.raiseInputCb}
                readOnly={this.props.readOnly}>
            </input>
        );
    }
    
}

export default Placeholder;