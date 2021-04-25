import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

//acceso a Base de datos
const db = firebase.firestore(firebaseApp)


export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const loginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña no válidos."
    }
    return result
}


export const getCollection = async(collection) => {
    const result = { statusResponse : false, data: null, error: null } 
    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.error = error
    }   
    return result
}

export const getTaskById = async(id) => {
    const result = { statusResponse: true, error: null }
    try {
        const data = await db
            .collection("task")
            .where("idUser", "==", id)
            .get()
            const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
            result.statusResponse = true
            result.data = arrayData   
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocument = async(collection, data) => {
    console.log('save daata')
    const result = { statusResponse : false, data: null, error: null } 
    try {
        const response = await db.collection(collection).add(data)
        result.data = { id: response.id } 
        result.statusResponse = true      
    } catch (error) {
        result.error = error
    }
    return result
}

export const getDocument = async(collection, id) => {
    const result = { statusResponse : false, data: null, error: null } 
    try {
        const response = await db.collection(collection).doc(id).get()
        result.data = { id: response.id, ...response.data() } 
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse : false, error: null } 
    try {
        await db.collection(collection).doc(id).update(data)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}

export const deleteDocument = async(collection, id) => {
    const result = { statusResponse : false, error: null } 
    try {
        await db.collection(collection).doc(id).delete()
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }
    return result
}