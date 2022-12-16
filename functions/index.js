const functions = require('firebase-functions');
const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

initializeApp();

const auth = getAuth();

exports.createUser = functions.https.onCall(async (data, context) => {
    const { email, password, displayName, photoURL, accessLevel } = data;
    const user = { email, password, displayName, photoURL };
    const customClaims = { accessLevel };
    await auth
        .createUser(user)
        .then((userRecord) => {
            functions.logger.log('Successfully created new user:', userRecord.uid);
            auth.setCustomUserClaims(userRecord.uid, customClaims);
        })
});
