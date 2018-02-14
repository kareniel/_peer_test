var hypercore = require('hypercore')
var swarm = require('hyperdiscovery')
var ram = require('random-access-memory')
var key = '64b8be2906394d5d09dc6dff7132088dd05459e6069593e51dfd8c8d945dc602'

var feed = hypercore(ram, key, {valueEncoding: 'json'})

feed.on('ready', function () {
  console.log(feed.key.toString('hex'))

  var sw = swarm(feed)

  sw.on('connection', function (peer, type) {
    console.log('connected to', sw.connections.length, 'peers')
    peer.on('close', function () {
      console.log('peer disconnected')
    })
  })
})
