import React, { Component } from 'react';
import '../.././src/App.css'
import Card from './Card';
import Placeholder from './Placeholder';

class Hand extends Component{
    constructor(props){
        super(props)
        this.state={
            cardInfo:{
                cardCode: null,
                selected: false
            }
        };
        this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
    }

    async getCardInfoFromChild(dataFromChild){
        await this.setState({cardInfo: dataFromChild})
        this.props.parentcb(this.state.cardInfo)
    }

  

    render() {
        return ( 
            <div className={this.props.class}>
            <Placeholder 
                class={this.props.npc ? "npc-placeholder" : "player-placeholder"}
                value={this.props.value}
                readOnly={this.props.readOnly}
                />
                {this.props.cards.map((card, i) => <Card 
                    parentcb={this.getCardInfoFromChild} 
                    key={i} 
                    selectedCards={this.props.selectedCards}
                    player={this.props.player}
                    npc={this.props.npc} 
                    cardCode={card}
                    />)}
            </div>
        )
    }
}

export default Hand;