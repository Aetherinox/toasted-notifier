/* eslint-disable no-console */

const notifier = require('../');
const nc = new notifier.NotificationCenter();

const trueAnswer = 'Yessir.';

/*
    @note       : closeLabel is case sensitive
*/

nc.notify(
    {
        title: 'Notifications',
        message: 'Do you like them?',
        sound: 'Funk',
        closeLabel: 'Nope',
        actions: trueAnswer
    },
    function (err, response, metadata) {
        if (err) throw err;
        console.log(metadata);

        if (metadata.activationValue !== trueAnswer) {
            return; // Do not continue
        }

        nc.notify(
            {
                title: 'Notifications',
                message: 'Do you wish to reply to them?',
                sound: 'Funk',
                reply: true
            },
            function (err, response, metadata) {
                if (err) throw err;
                console.log(metadata);
            }
        );
    }
);

nc.on('replied', function (obj, options, metadata) {
    console.log('User has replied', metadata);
});
