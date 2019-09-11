import React from 'react';
import '../.././src/App.css'
import Button from './Button';
import Placeholder from './Placeholder';

function Sidebar(props){

    function receiveRaiseAmount(dataFromChild){
        props.sendInfo(dataFromChild)
    }

        return (
            <div className="gameplay-button-group">
                <Button 
                    class='raise-btn' 
                    name='Raise' 
                    onClick={props.onRaise}/>
                <Placeholder 
                    class='raise-placeholder' 
                    parentCb={receiveRaiseAmount} 
                    readOnly={false}
                    value={props.raiseInput}
                    />
                <Button 
                    class='call-btn' 
                    name='Call'
                    onClick={props.onCall}/>
                <Button 
                    class='fold-btn' 
                    name='Fold'
                    onClick={props.onFold}/>
                <div className='text-style'>NPC bet</div>
                <Placeholder 
                    class='bet-placeholder' 
                    readOnly={true} 
                    value={props.npcBet}
                    />
                <div className='text-style'>Player bet</div>
                <Placeholder 
                    class='bet-placeholder' 
                    readOnly={true} 
                    value={props.playerBet}
                    />
                <div className='text-style'>Total amount</div>
                <Placeholder 
                    class='bet-placeholder'
                    readOnly={true} 
                    value={props.totalBet}
                    />
                <Button 
                    class='new-game-btn' 
                    name='Start New Game'
                    onClick={props.startNewGame}/>
                <Button 
                    class='change-cards-btn' 
                    name='Change Cards'
                    onClick={props.changeCards}
                    disableBtn={props.disableBtn}/>
            </div>
        );
    }

export default Sidebar;