const authReducer = (state = [], action = {}) => {
  switch (action.type) {
    case 'SAVE_EMAIL_PASSWORD':
      return {
        ...state,
        ...action.payload
      };

    default:
      return {
        ...state,
        email: '',
        password: ''
      };
  }
};

export default authReducer;
