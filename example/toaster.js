const notifier = require('../index');
const path = require('path');

notifier.notify(
    {
        message: 'This is a longer notification which\ndisplays numerous lines of text for\nthe user to see.\nNice.',
        icon: path.join(__dirname, 'example_1.png'),
        sound: true
    },
    function (err, data) {
        // Will also wait until notification is closed.
        console.log('Waited');
        console.log(JSON.stringify({ err, data }));
    }
);

notifier.on('timeout', () => {
    console.log('Timed out!');
});

notifier.on('click', () => {
    console.log('Clicked!');
});
