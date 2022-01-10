var https = require('https');

exports.send = function(input) {
  console.log("I did get into the sms function...");
  console.log(input);

  // Send SMS to Twillio...
  https.get(input, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

   res.on('data', (d) => {
     process.stdout.write(d);
  });

    }).on('error', (e) => {
     console.error(e);
  });
  // End SMS to Twillio code.

}
