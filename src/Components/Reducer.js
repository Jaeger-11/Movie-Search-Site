const Reducer = (state, action) => {
    switch(action.type){
        case 'SEARCHING':
            return {...state, isSearching: true, searchWord: action.payload, url :`https://omdbapi.com/?s=${action.payload}&page=1&apikey=eb178fd2`}
        case 'SHOW_MOVIES':
            return{...state, searchResponse: action.payload, pages: Math.ceil(Number(action.payload .totalResults)/10) }
        case 'CHANGE_PAGE':
            return{...state, url :`https://omdbapi.com/?s=${state.searchWord}&page=${action.payload}&apikey=eb178fd2` }
        case 'VIEW_INFO':
            return{...state,id: action.payload}
        case 'ADD_TO_FAVOURITES':
            const exist = state.favourites.includes(action.payload)
            if (exist){
                return {...state}
            }else {
                return{...state, favourites: [...state.favourites, action.payload]}
            }
        case 'DISPLAY_USER':
            return{...state, userIn: true}
        default: 
            return state;
    }
}

export default Reducer;