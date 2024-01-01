const initialState = {
    users: [],
    selectedUser: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            return { ...state, users: action.payload };
        case 'SELECT_USER':
            return { ...state, selectedUser: action.payload };
        default:
            return state;
    }
};

export default userReducer;