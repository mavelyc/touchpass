'use strict'

const ilp = require('ilp')
const spsp = require('ilp-protocol-spsp')
const debug = require('debug')('ilp-spsp')

// recipient is the payment pointer
// amount is 1 XRP = 10^9 units

async function pay (recipient, amount) {
  try {
    const plugin = ilp.createPlugin()
    debug('connecting plugin')
    await plugin.connect()

    debug('sending payment')
    await spsp.pay(plugin, {
      receiver: recipient,
      sourceAmount: amount
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }

  console.log('sent!')
  process.exit(0)
}

// sending 0.0000001 XRP
function run () {
  pay('$arcade.localtunnel.me', 1)
}

run()