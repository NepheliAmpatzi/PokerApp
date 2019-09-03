import React, { Component } from 'react';
import '../.././src/App.css'
import Button from './Button';
import Placeholder from './Placeholder';

class Sidebar extends Component{
    constructor(props) {
        super(props)
        this.state = {
            npcBetPlaceholder: '',
            playerPlaceholder: '',
            raiseInput: '',
            totalBetAmount: '',

        }
        this.receiveRaiseAmount = this.receiveRaiseAmount.bind(this);
        this.raiseCb = this.raiseCb.bind(this);
    }
    
    async raiseCb(){
        await this.setState({
            npcBetPlaceholder: Number(this.state.raiseInput) + Number(this.state.npcBetPlaceholder),
            playerPlaceholder: Number(this.state.raiseInput) + Number(this.state.playerPlaceholder)
        })
        await this.setState({
            totalBetAmount: Number(this.state.npcBetPlaceholder) + Number(this.state.playerPlaceholder)
        })
        this.props.appcb(this.state.playerPlaceholder)
    }

    async receiveRaiseAmount(dataFromChild){
        await this.setState({
            raiseInput: dataFromChild
        })
    }

    render(){
        return (
            <div className="gameplay-button-group">
                <Button 
                    class='raise-btn' 
                    name='Raise' 
                    onClick={this.raiseCb}/>
                <Placeholder 
                    class='raise-placeholder' 
                    parentCb={this.receiveRaiseAmount} 
                    readOnly={false}
                    />
                <Button 
                    class='call-btn' 
                    name='Call'
                    onClick={this.props.onClick}/>
                <Button 
                    class='fold-btn' 
                    name='Fold'
                    onClick={this.props.foldCb}/>
                <div className='text-style'>NPC bet</div>
                <Placeholder 
                    class='bet-placeholder' 
                    readOnly={true} 
                    value={this.props.emptyInputs}/>
                <div className='text-style'>Player bet</div>
                <Placeholder 
                    class='bet-placeholder' 
                    readOnly={true} 
                    value={this.state.playerPlaceholder}/>
                <div className='text-style'>Total amount</div>
                <Placeholder 
                    class='bet-placeholder'
                    readOnly={true} 
                    value={this.state.totalBetAmount}/>
                <Button 
                    class='new-game-btn' 
                    name='Start New Game'
                    onClick={this.props.startNewGame}/>
                <Button 
                    class='change-cards-btn' 
                    name='Change Cards'
                    onClick={this.props.changeCards}
                    disableBtn={this.props.disableBtn}/>
            </div>
        );
    }
}

export default Sidebar;