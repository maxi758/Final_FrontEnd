const initial_state = {
  especialidadesList: [],
};

const especialidades_reducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'FETCH_ESPECIALIDADES_START':
      return { ...state, isLoading: true };
    case 'FETCH_ESPECIALIDADES_SUCCESS':
      return { ...state, isLoading: false, especialidades: action.payload };
    case 'FETCH_ESPECIALIDADES_FAIL':
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default especialidades_reducer;
