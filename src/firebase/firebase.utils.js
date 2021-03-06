import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
        apiKey: "AIzaSyCVZJIVyKopBk6NWr2Rmnw_pahGQGShy-k",
        authDomain: "ejs-db.firebaseapp.com",
        databaseURL: "https://ejs-db.firebaseio.com",
        projectId: "ejs-db",
        storageBucket: "ejs-db.appspot.com",
        messagingSenderId: "134053432224",
        appId: "1:134053432224:web:ff9a84c28ef2acbb50f2c5",
        measurementId: "G-J7KMZKCQ19"
      };

export const createUserProfileDocument = async (userAuth, additionalData) => {
          if (!userAuth) return;

          const userRef = firestore.doc(`users/${userAuth.uid}`);

          const snapShot = await userRef.get();

             if(!snapShot.exists) {
               const { displayName, email} = userAuth;
               const createdAt = new Date ();

               try {
                  await userRef.set({
                    displayName,
                    email,
                    createdAt,
                    ...additionalData
                  });
               } catch (error) {
                console.log("error creating user", error.message);
               }
             }
             return userRef;
};

      firebase.initializeApp(config);
      

      export const auth = firebase.auth();
      export const firestore = firebase.firestore();

      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters ({ prompt: "select_account" });
      export const signInWithGoogle = () => auth.signInWithPopup(provider);

      export default firebase;
