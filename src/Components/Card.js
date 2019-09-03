import React, { Component } from 'react';
import '../.././src/App.css'
import handevaluation from '../handevaluation';


class Card extends Component{
    constructor(props){
        super(props)
        this.state = {
            selected: false,
            cardInfo: {
                cardCode: this.props.cardCode,
                selected: false
            }
        };
        this.selectedCard = this.selectedCard.bind(this);
    }

    getCardCss(num, suit) {
        return "rank-"+num.toString().toLowerCase()+" "+suit;
    }

    getSuitSymbol(suit){
        let suitHtml = '';
        switch(suit){
            case 'spades': suitHtml = '♠'; break;
            case 'hearts': suitHtml = '♥'; break;
            case 'clubs': suitHtml = '♣'; break;
            case 'diams': suitHtml = '♦'; break;
            default: suitHtml = ''; break;   
        }
        return suitHtml;
    }

    async selectedCard(){
        await this.setState({selected: true})
        let cardinformation = {
            cardCode: this.props.cardCode, 
            selected: this.state.selected
        }
        await this.setState({cardInfo: cardinformation})
        this.props.parentcb(this.state.cardInfo)
    }

    render() {
        const {NumberL, SuitL} = handevaluation.getCardLiteralsFromCardCode(this.props.cardCode);
        return (
            <div className="playingCards fourColours">
                <a onClick={this.selectedCard} 
                className={this.props.npc ? "card back" : "card " + this.getCardCss(NumberL, SuitL)}>
                    <span className="rank">{NumberL}</span>
                    <span className="suit">{this.getSuitSymbol(SuitL)}</span>
                </a>
            </div>
        )
    }
}

export default Card;