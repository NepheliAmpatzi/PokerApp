import React, { Component } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Hand from './Components/Hand';
import handevaluation from './handevaluation';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const list = [];
    list.push(Math.floor(Math.random() * (max - min + 1)) + min)
    return list;
}

function generateDeck(){
    const deck = [];
    handevaluation.suits.forEach(suit => {
        handevaluation.ranks.forEach(rank =>{
            deck.push(Number(rank.code.toString()+suit.code.toString()));
        });
    });
    return deck;
}

function shuffleDeck(deck){
    const shuffledDeck = [];
    while(shuffledDeck.length < deck.length){
       const cardIndex = getRandomInt(0, deck.length-1);
       if(!shuffledDeck.includes(deck[cardIndex])){
           shuffledDeck.push(deck[cardIndex]);
       } 
    }
    return shuffledDeck;
}

export function drawCards(shuffledDeck, num){
    return shuffledDeck.splice(0, num);
}

function compareTwoHands(player, npc){
    if(player > npc){
        alert("You Win!!!");
        return 100;
    }
    if(player < npc){
        alert("You lose :(");
        return 0;
    }
    if(player === npc){
        alert("Tie!");
        return 50;
    }
}
const deck = shuffleDeck(generateDeck());

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            playerHand: drawCards(deck, 5),
            npcHand: drawCards(deck, 5),
            deck: deck,
            allselectedCards: [],
            uniqueselectedCards: [],
            npcBet: '',
            playerBet: '',
            startingMoney: 1000,
            currentNpcBalance: 1000,
            currentPlayerBalance: 1000,
            playerWins: false,
            npcWins: false,
            tie: false,
            cardInfo:{
                cardCode: null,
                selected: false
            }
        }  
        this.getCardInfoFromChild = this.getCardInfoFromChild.bind(this);
        this.changeBalances = this.changeBalances.bind(this);
        this.callCb = this.callCb.bind(this);
        this.foldCb = this.foldCb.bind(this);
        this.startNewGame = this.startNewGame.bind(this);
        
    }

    async getCardInfoFromChild(dataFromChild){
        await this.setState({cardInfo: dataFromChild})
        if(this.state.cardInfo.selected){
            await this.setState((prevState) => ({
                allselectedCards : prevState.allselectedCards.concat(this.state.cardInfo.cardCode)
            }))
            const uniquepickedcards = [...new Set(this.state.allselectedCards)]
            await this.setState({uniqueselectedCards: uniquepickedcards})
            if(this.state.cardInfo.selected &&
                this.state.uniqueselectedCards.length <= 3){
                    this.handleCardInfo();
                }
        }
    }

    handleCardInfo(){
        let playerhand = this.state.playerHand;
        let uniquecards = this.state.uniqueselectedCards;
        let randomCards = drawCards(this.state.deck, uniquecards.length);
        let index = playerhand.indexOf(this.state.cardInfo.cardCode)
        if(this.state.cardInfo.selected &&
            this.state.uniqueselectedCards.length <= 3 &&
            uniquecards.map(card => playerhand.includes(card))){
            playerhand.splice(index, 1, randomCards[0])   
        }
        this.setState({ playerHand: playerhand })
    }

    async callCb(){
    let result = compareTwoHands(
        handevaluation.CheckTheHand(this.state.playerHand), 
        handevaluation.CheckTheHand(this.state.npcHand))
    if(result === 100) await this.setState({playerWins: true})
    if(result === 0) await this.setState({npcWins: true})
    this.betApportionment(this.state.playerWins, this.state.npcWins)
    }

    foldCb(){
        alert("You lose :(");
        this.setState({
            npcWins: true
        })
    }

    async changeBalances(dataFromChild){
    await this.setState({
        npcBet: dataFromChild, 
        playerBet: dataFromChild
    })
    await this.setState({
        currentNpcBalance: this.state.currentNpcBalance - this.state.npcBet,
        currentPlayerBalance: this.state.currentPlayerBalance - this.state.playerBet
    })
    }

    betApportionment(winner1, winner2){
        if(winner1){
            this.setState({
                currentPlayerBalance: this.state.currentPlayerBalance + this.state.playerBet + this.state.npcBet
            })
        }
        if(winner2){
            this.setState({
                currentNpcBalance: this.state.currentNpcBalance + this.state.playerBet + this.state.npcBet
            })
        }
    }

    startNewGame(){
        this.setState({
            playerHand: drawCards(shuffleDeck(generateDeck()), 5),
            npcHand: drawCards(shuffleDeck(generateDeck()), 5),
            allselectedCards: [],
            uniqueselectedCards: [],
            playerWins: false,
            npcWins: false,
            tie: false,
            cardInfo:{
                cardCode: null,
                selected: false
            }
        })
    }

    render() {
        return (
            <div>
                <Hand 
                    class="npc-hand" 
                    npc={true} 
                    cards={this.state.npcHand}
                    parentcb={this.getCardInfoFromChild}
                    value={this.state.currentNpcBalance}
                />
                <Sidebar 
                    readOnly={false} 
                    appcb={this.changeBalances}
                    onClick={this.callCb}
                    foldCb={this.foldCb}
                    startNewGame={this.startNewGame}
                />
                <Hand 
                    class="player-hand" 
                    npc={false} 
                    cards={this.state.playerHand}
                    parentcb={this.getCardInfoFromChild}
                    value={this.state.currentPlayerBalance}
                />
            </div>
        );
    }
}

export default App;