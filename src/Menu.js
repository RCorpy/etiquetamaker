import React from 'react'

export default function Menu({fulfillOrders, getJSON, startAt, setStartAt}) {

    const handleStartAt = ()=>{
        if(startAt<7){
            setStartAt(startAt+1)
        }
        else{
            setStartAt(0)
        }
    }

    const printfunction = () =>{
        const restorePage = document.body.innerHTML
        const printContent = document.getElementById("printcontent").innerHTML

        document.body.innerHTML=printContent
        window.print()
        document.body.innerHTML=restorePage
    }


    return (
        <div className="menu">
            <button onClick={printfunction}>PRINT</button>
            <button onClick={fulfillOrders}>MARK AS FULFILLED</button>
            <button onClick={getJSON}>MORE ORDERS</button>
            <button onClick={handleStartAt}>STARTS AT {startAt+1}</button>
        </div>
    )
}
