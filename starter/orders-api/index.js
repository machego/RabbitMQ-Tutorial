const express = require("express")
const app = express()
const amqp = require('amqplib')  //queue protocol lib

const amqpUrl = 'amqp://localhost:5672'  // url to connect

const orderData = {
    customerId: 9,
    orderId: 3,
    number: '55 222 5555'
}


app.get('/', async (req, res) => {
    try {
        const connection = await amqp.connect(amqpUrl)
        const channel = await connection.createChannel()
        await channel.assertQueue('order.shipped')
        channel.sendToQueue('order.shipped', Buffer.from(JSON.stringify(orderData))) 
    } catch (error) {
        console.log('error')
    }
    res.send("ORDERS API")
})

app.listen(8000, () => {
    console.log("ORDERS API listening on port 8000")
})