import axios from 'axios';

export function updatePictureState(){
	return {
		type: 'UPDATE_PIC_STATE', payload: axios.get('/update-picture-state').then(function(response){
			return response.data
		})
	}
}
