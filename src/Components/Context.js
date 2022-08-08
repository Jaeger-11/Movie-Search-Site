import React, { useContext, useReducer, useState, useEffect } from "react";
import Reducer from "./Reducer";
import {onAuthStateChanged, signOut} from 'firebase/auth';
import { auth } from '../Firebase/Config';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { projectFirestore } from "../Firebase/Config";

const AppContext = React.createContext();

const defaultState = { 
    isSearching: false,
    searchWord: '',
    searchResponse: {},
    pages: 1,
    currentPage: 1,
    url: '',
    id: '',
    favourites: [],
    user: null,
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, defaultState);
    const [loggedUser, setLoggedUser] = useState('');
    const [loggedEmail, setLoggedEmail] = useState('');
    const [uid, setUid] = useState('');
    const [displayUser, setDisplayUser] = useState(false);
    const [modal, setModal] = useState(false);
    const [favModal, setFavModal] = useState(false); 


    const searching = (text) => {
        dispatch({type:'SEARCHING', payload: text})
    }
    const showMovies = (data) => {
        dispatch({type:'SHOW_MOVIES', payload:data})
    }
    const changePage = (page) => {
        dispatch({type:'CHANGE_PAGE', payload:page})
    }
    const nextPage = () => {
        dispatch({type:'NEXT_PAGE'})
    }
    const previousPage = () => {
        dispatch({type:'PREVIOUS_PAGE'})
    }
    const movieInfo = (id) => {
        dispatch({type: 'VIEW_INFO', payload: id})
    }
    const addToFavourites = (id) => {
        dispatch({type: 'ADD_TO_FAVOURITES', payload: id})
    } 
    const removeFromFavourites = (id) => {
        dispatch({type: 'REMOVE_FROM_FAVOURITES', payload: id})
    } 
    const addUid = (uid) => {
        dispatch({type:'ADD_UID', payload: uid})
    }
    const getFavourites = (fave) => {
        dispatch({type:'GET_FAVOURITES', payload: fave})
    }
    
    const handleFavModal = () => {
        setFavModal(true)
        setTimeout(() => {
            setFavModal(false);
        }, 2000)
    }

    
    onAuthStateChanged(auth, (user) => {
        if(user){
            setLoggedUser(user.displayName)
            setLoggedEmail(user.email)
            setUid(user.uid)
            if (state.user){
                const docRef = doc(projectFirestore, "users", state.user );
                getDoc(docRef)
                    .then((doc) => {
                        const data = doc.data()
                        getFavourites(data.favourites)
                    })
            } else {}
        } else {
            setLoggedEmail('');
            setLoggedUser(''); 
            setUid('')   
        }
    })

    useEffect(() => {
        addUid(uid)
    }, [uid])

    return(
        <AppContext.Provider
            value={{
                ...state,
                searching,
                showMovies,
                changePage,
                nextPage,
                previousPage,
                movieInfo,
                addToFavourites,
                removeFromFavourites,
                loggedUser,
                loggedEmail,
                setDisplayUser,
                displayUser,
                modal,
                setModal,
                favModal,
                handleFavModal,
                addUid,
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