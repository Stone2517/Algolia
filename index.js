const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const admin = require('./admin');

dotenv.load();

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

const fire = admin.firestore();

fire.collection("Users").onSnapshot((snapshot) => {
    const added = [];
    const modified = [];
    const removed = [];
      snapshot.docChanges.forEach((change) => {
        if (change.type === "added") {
            const note = change.doc.data();
            note.objectID = change.doc.id;
            added.push(note);
        }
        if (change.type === "modified") {
            const modify = change.doc.data();
            modify.objectID = change.doc.id;
            modified.push(modify);
        }
        if (change.type === "removed") {
            removed.push(change.doc.id);
        }
    });
    let x = 0;
    if(added.length !== 0){
        index.addObjects(added, function(err, content) {
            console.log(err, content);
        });
    }
    if(modified.length !== 0){
        index.saveObjects(modified, function(err, content) {
            console.log(err, content);
        });
    }
    if(removed.length !== 0){
        index.deleteObjects(removed, function(err, content) {
            console.log(err, content);
        });
    }
});    