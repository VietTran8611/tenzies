import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import { useEffect } from "react"
import Confetti from "react-confetti"

/*
- put real dots on the dice
-track number of roll
-track time it took to win
-save best time in local Storage
 */

export default function Main(){
    const [dice,setDice]=useState(allNewDice())
    const [tenzies,setTenzies]=useState(false)



    useEffect(()=>{
        // if all isheld is true .every return true
        const allHeld= dice.every(die =>die.isheld)
        const firstvalue = dice[0].value
        const allSameValue=dice.every(die=> die.value === firstvalue)
        if(allHeld && allSameValue){
            setTenzies(true)
        }
    },[dice])

    function generateNewDice(){
        return {
            value :Math.ceil(Math.random()*6),
            isheld:false,
            id: nanoid()
        }
    }

    function rollDice(){
        if(!tenzies){
        setDice( oldDice=> oldDice.map(die => {
            return die.isheld ? 
                die : 
                generateNewDice()
        }))} else{
            setTenzies(false)
            setDice(allNewDice)
        }
    }

    function holdDice(id){
        setDice(oldDice=> oldDice.map(die => {
            return die.id === id ?
            {...die, isheld: !die.isheld}:
            die
        }))
    }

    function allNewDice(){
        const newDice=[]
        for(let i =0;i<10;i++){
            newDice.push(generateNewDice())
        }
        return newDice
    }

    const diceElements = dice.map(die=> <Die value={die.value} key={die.id} isHeld={die.isheld} holdDice={()=>holdDice(die.id)}/>)

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="tittle">Tenzies</h1>
            <p className="introduction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {diceElements}
            </div>
            <button className="roll--dice" onClick={rollDice}>{tenzies ? "New game" : "Roll"}</button>
        </main>
    )
}