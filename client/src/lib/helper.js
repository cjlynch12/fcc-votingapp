export const updatePoll = (poll, fieldsToUpdate) => {
	return Object.assign(poll, fieldsToUpdate);
}

export const updatePollList = (updatedPoll, pollList) => {
	let updatedPollList = pollList.map(poll => {
		if(poll._id === updatedPoll._id){
			return updatedPoll;
		} else {
			return poll;
		}
	})
	return updatedPollList;
}

export const addNewPoll = (newPoll, pollList) => {
	return [...pollList, newPoll];
}

export const updateUser = (fieldToUpdate, newItem, user) => {
	let updatedUser = Object.assign({}, user);
	updatedUser[fieldToUpdate] = [...updatedUser[fieldToUpdate], newItem];
	return updatedUser;
}

export const checkOptions = (rawOptions) => {
	return rawOptions.some(rawOption => rawOption !== '');
}

export const formatOptions = (rawOptions) => {
	return rawOptions
		.filter(rawOption => rawOption !== '')
		.map((rawOption, index) => {
			return {
				optionId: index,
				option: rawOption,
				vote: 0
			}
		});
}