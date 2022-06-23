import React, { useContext, useReducer, useState, useEffect } from "react";
import Reducer from "./Reducer";
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../Firebase/Config';
import { collection, query, where, doc, setDoc } from "firebase/firestore";
import { projectFirestore } from "../Firebase/Config";

const AppContext = React.createContext();
const defaultState = { 
    isSearching: false,
    searchWord: '',
    searchResponse: {},
    pages: 1,
    url: '',
    id: '',
    favourites: [],
    userIn: false,
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, defaultState)
    const [loggedUser, setLoggedUser] = useState('');
    const [loggedEmail, setLoggedEmail] = useState('');
    // const faveRef = collection(projectFirestore, 'fave');
    // const q = query(userRef, where("email", '==', loggedEmail))

    // useEffect(() => {
    //     addDoc(doc(faveRef), {
    //         fave: 'lll'
    //     });
    // }, [state.favourites])
    

    onAuthStateChanged(auth, (user) => {
        if(user){
            setLoggedUser(user.displayName)
            setLoggedEmail(user.email)
        } else {
            setLoggedEmail('');
            setLoggedUser('');
        }
    }) 

    const searching = (text) => {
        dispatch({type:'SEARCHING', payload: text})
    }
    const showMovies = (data) => {
        dispatch({type:'SHOW_MOVIES', payload:data})
    }
    const changePage = (page) => {
        dispatch({type:'CHANGE_PAGE', payload:page})
    }
    const movieInfo = (id) => {
        dispatch({type: 'VIEW_INFO', payload: id})
    }
    const addToFavourites = (id) => {
        dispatch({type: 'ADD_TO_FAVOURITES', payload: id})
    } 
    const displayUser = () => {
        dispatch({type: 'DISPLAY_USER'})
    }

    return(
        <AppContext.Provider
            value={{
                ...state,
                searching,
                showMovies,
                changePage,
                movieInfo,
                addToFavourites,
                loggedUser,
                loggedEmail,
                displayUser,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}

export {useGlobalContext, AppProvider};