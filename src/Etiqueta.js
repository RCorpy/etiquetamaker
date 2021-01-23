import React from 'react'
import Remitente from './Remitente'
import Destinatario from './Destinatario'


export default function Etiqueta({order}) {

    const isEmpty = order.line_items[0].quantity===0 ? {display: "none"} : {}

    return (
        <div className="etiquetacontainer">
            <Remitente conditionalStyle={isEmpty}/>
            <div className="cantidad" style={isEmpty}>{order.line_items[0].quantity}</div>
            <Destinatario order={order} />
        </div>
    )
}
