const cat = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CAT':
            return {
                id: action.cat.id,
                name: action.cat.name,
                image: action.cat.image,
                counter: action.cat.counter,
                active: action.cat.active
            }
        case 'ACTIVATE_CAT':
            if (state.id !== action.id)
                return Object.assign({}, state, {active: false})
            return Object.assign({}, state, {active: true})
        case 'INCREMENT':
            if (state.active)
                return Object.assign({}, state, {counter: state.counter+1})
            return state
        default:
            return state
    }
}

const cats = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CAT':
            return [
                ...state,
                cat(undefined, action)
            ]
        case 'ACTIVATE_CAT':
            return state.map(c => {
                return cat(c, action)
            })
        case 'INCREMENT':
            return state.map(c => {
                return cat(c, action)
            })
        default:
            return state
    }
}

export default cats
