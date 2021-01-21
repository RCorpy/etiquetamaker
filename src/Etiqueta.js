import React from 'react'
import Remitente from './Remitente'
import Destinatario from './Destinatario'


export default function Etiqueta({order}) {
    return (
        <div className="etiquetacontainer">
            <Remitente />
            <div className="cantidad">{order.line_items[0].quantity}</div>
            <Destinatario order={order} />
        </div>
    )
}
