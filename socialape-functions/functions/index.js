const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Evolution!");
});

exports.getIcecream = functions.https.onRequest((request, response) => {
    admin.firestore().collection('icecream').get()
    .then(data => {
      let icecream =[];
      data.forEach(doc => {
        icecream.push(doc.data());
      });
      return response.json(icecream)
    })
    .catch(err => console.error(err))
});

exports.createIcecream = functions.https.onRequest((req, res) => {
    const newIcecream = {
      body: req.body.body,
      userHandle: req.body.userHandle,
      createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection('icecream')
    .add(newIcecream)
    .then(doc => {
      res.json({message: `document ${doc.id} created successfully`});
    })
    .catch(err => {
      res.status(500).json({error: 'something went wront'});
      console.error(err);
    })
});
