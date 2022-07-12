import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { projectFirestore } from "../Firebase/Config";

const Reducer = (state, action) => {

    switch(action.type){
        case 'SEARCHING':
            return {...state, isSearching: true, searchWord: action.payload, url :`https://omdbapi.com/?s=${action.payload}&page=1&apikey=eb178fd2`}
        case 'SHOW_MOVIES':
            return{...state, searchResponse: action.payload, pages: Math.ceil(Number(action.payload.totalResults)/10) }
        case 'CHANGE_PAGE':
            return{...state, url :`https://omdbapi.com/?s=${state.searchWord}&page=${action.payload}&apikey=eb178fd2`,currentPage: action.payload }
        case 'VIEW_INFO':
            return{...state,id: action.payload}
        case 'GET_FAVOURITES':
            return{...state, favourites: action.payload}
        case 'ADD_TO_FAVOURITES':
            const exist = state.favourites.includes(action.payload)
            if (exist){
                return {...state}
            }else {
                updateDoc(doc(projectFirestore, 'users', state.user), {
                    favourites: arrayUnion(action.payload)
                });
                // return{...state, favourites: [...state.favourites, action.payload]}
            }
        case 'ADD_UID':
            return{...state, user: action.payload} 
        default: 
            return state;
    }
}

export default Reducer;

// await updateDoc(washingtonRef, {
//     regions: arrayUnion("greater_virginia")
// });

// // Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//     regions: arrayRemove("east_coast")
// });