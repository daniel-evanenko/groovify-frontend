export const SET_IS_LOADING = 'SET_IS_LOADING'


const initialState = {
    isLoading: true
}

export function systemReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        default:
            return state
    }


}