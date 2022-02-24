import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'

let apiKey
let authDomain
let projectId
let storageBucket
let messagingSenderId
let appId

if (process.env.NODE_ENV !== 'Production') {
  apiKey = process.env.REACT_APP_API_KEY
  authDomain = process.env.REACT_APP_AUTH_DOMAIN
  projectId = process.env.REACT_APP_PROJECT_ID
  storageBucket = process.env.REACT_APP_STORAGE_BUCKET
  messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID
  appId = process.env.REACT_APP_APP_ID
} else {
  apiKey = process.env.API_KEY
  authDomain = process.env.AUTH_DOMAIN
  projectId = process.env.PROJECT_ID
  storageBucket = process.env.STORAGE_BUCKET
  messagingSenderId = process.env.MESSAGING_SENDER_ID
  appId = process.env.APP_ID
}

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
