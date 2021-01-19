import React from 'react'

export default function Etiqueta({order}) {
    return (
        <div className="etiquetacontainer">
            <p className="cantidad">{order.line_items[0].quantity}</p>
            <p>DIRECCION: {order.billing_address.address1 + order.billing_address.address2}</p>
            <p>NOMBRE: {order.billing_address.first_name + order.billing_address.last_name}</p>
            <p>CIUDAD: {order.billing_address.city}</p>
            <p>PROVINCIA: {order.billing_address.province}</p>
            <p>ZIP: {order.billing_address.zip}</p>
            <p>PAIS: {order.billing_address.country}</p>
        </div>
    )
}
