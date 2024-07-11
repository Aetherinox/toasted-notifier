const notifier = require('../');
const nc = new notifier.NotificationCenter();
const path = require('path');

nc.notify(
    {
        title: 'Phil Coulson',
        subtitle: 'Agent of S.H.I.E.L.D.',
        message: "If I come out, will you shoot me? 'Cause then I won't come out.",
        sound: 'Funk',
        // case sensitive
        wait: true,
        icon: path.join(__dirname, 'example_1.png'),
        contentImage: path.join(__dirname, 'example_1.png'),
        open: 'file://' + path.join(__dirname, 'example_1.png')
    },
    function () {
        console.log(arguments);
    }
);
