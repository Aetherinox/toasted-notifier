/* eslint-disable no-console */
const toasted = require('../index');

const balloon = toasted.WindowsBalloon();
balloon
    .notify({ message: 'Hello' }, function (err, data) {
        console.log(err, data);
    })

    .on('click', function () {
        console.log(arguments);
    });
