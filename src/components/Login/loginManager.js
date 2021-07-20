import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeLoginFramework = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  // promise return kore resolve hoye je newuser holo seti return kora hoyese.
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth().signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      };
      return signedInUser;
      // setUser er console.log(displayName, email, photoURL);
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
};

export const handleGoogleSignOut = () => {
  return firebase.auth().signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        photo: "",
        error: "",
        success: false,
      };
      return signedOutUser;
    })
    .catch(err => {
      // an err happened.
  });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
    //   setUser(newUserInfo);
    //   console.log("sign in user info", res.user);
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // console.log(errorCode, errorMessage);
      // ..
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
      // setUser(newUserInfo);
      // setLoggedInUser(newUserInfo);
      // history.replace(from);

      // console.log("sign in user info", res.user);
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // setUser(newUserInfo);
    });
};

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("user name updated successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
