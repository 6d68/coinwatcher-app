import service from '../api/data_service';

// Actions
export const types = {
    ADD_TO_WATCHLIST: 'ADD_TO_WATCHLIST',
    REFRESH_WATCHLIST: 'REFRESH_WATCHLIST',
    REFRESHED_WATCHLIST: 'REFRESHED_WATCHLIST',
    REMOVE_FROM_WATCHLIST: 'REMOVE_FROM_WATCHLIST',
}

// Action creators
export const watchesActionCreators = {
    watch: (currency_info) => async (dispatch, getState) => {
        try {
            const info = await service.findCurrencyInfos(Array(1).fill(currency_info.id))
            dispatch({ type: types.ADD_TO_WATCHLIST, payload: info[0] })
        } catch (err) {
            dispatch({ type: types.ADD_TO_WATCHLIST, error: true })
        }
    },
    refresh: () => async (dispatch, getState) => {
        dispatch({ type: types.REFRESH_WATCHLIST, loading: true, error: false })
        try {
            const state = getState();
            const watching = state.watchlist.items.map(_ => _.id);
            const updated = await service.findCurrencyInfos(watching);
            dispatch({ type: types.REFRESHED_WATCHLIST, payload: updated })
        } catch (e) {
            dispatch({ type: types.REFRESHED_WATCHLIST, error: true })
        }
    },
    removeFromWatchList: (currencyId) => {
        return {
            type: types.REMOVE_FROM_WATCHLIST,
            currencyId
        }
    },
}

// initial state
const initialState = {
    items: [],
    loading: false,
    error: false
}

// Reducer
export const watchlist = (state = initialState, action) => {
    const { items } = state
    const { type, payload, error } = action

    switch (action.type) {
        case types.LOAD_CURRENCIES: {
            return { ...state, loading: true }
        }
        case types.ADD_TO_WATCHLIST: {
            return {
                ...state,
                items: [payload, ...items],
                loading: false,
                error: error
            }
        }
        case types.REFRESHED_WATCHLIST: {
            return {
                ...state,
                items: payload,
                loading: false
            }
        }
        case types.REMOVE_FROM_WATCHLIST: {
            return {
                ...state,
                items: state.items.filter(_ =>
                    _.id !== action.currencyId)
            }
        }
    }
    return state
}
