const initialState = []

const picReducer = (state = initialState, action) => {
	switch(action.type){
		case 'UPDATE_PIC_STATE_FULFILLED':
			state = action.payload
			break;
		default:
			return state
	}
	return state;
}

export default picReducer;

