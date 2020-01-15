// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

// Listens for new games at /games/:docId
// and creates an alert at /users/:uid/alerts/:docId
exports.makeGameAlert = functions.firestore.document('/games/{documentId}')
  .onCreate(async (snap, context) => {
    const game = { ...snap.data(), id: context.params.documentId}
    const owner = await getUser(game.uid);
    let promises = [];
    
    for (let player of game.players) {
      if (player !== owner.uid) {
        promises.push(createPlayerGameAlert(game, player, owner))
      }
    }
    return Promise.all(promises).then(console.log("All game alerts created."))
});

function getUser(uid) {
  return admin.firestore().collection('users').doc(uid)
    .get()
    .then(doc => {
      return doc.data();
    })
    .catch(error => console.log('error getting owner: ', error))
}

function createPlayerGameAlert(game, player, owner) {
  return admin.firestore().collection('users').doc(player).collection('alerts').add({
    type: "new_game",
    message: `${owner.displayName} started a new game with you.`,
    link: `/games/${game.id}`
  }).then(() => {
    return console.log('Created new game alert for ', player);
  }).catch((error) => {
    return console.error('New game alert failed for ', player, error);
  });
}
