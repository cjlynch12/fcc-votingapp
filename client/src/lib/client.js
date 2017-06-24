export const getPollList = successCb => (
	fetch('/poll', {
		headers: {
			'Accept': 'application/json',
		},
	}).then(checkStatus)
	  .then(parseJSON)
	  .then(successCb)
)

export const vote = (id, data, successCb) => (
	fetch('/poll/' + id, {
		method: 'put',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(checkStatus)
	  .then(parseJSON)
	  .then(successCb)
)

export const postNewPoll = (data, successCb) => (
	fetch('/poll', {
		method: 'post',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(checkStatus)
	  .then(parseJSON)
	  .then(successCb)
)

export const deletePoll = (id, data, successCb) => {
	fetch('/poll/' + id, {
		method: 'delete',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	}).then(checkStatus)
	  .then(parseJSON)
	  .then(successCb)
}

export const userLogin = (username, successCb) => (
	fetch('/users/' + username, {
		headers: {
			'Accept': 'application/json',
		}
	}).then(checkStatus)
	  .then(parseJSON)
	  .then(successCb)
)

const checkStatus = res => {
	if(res.status >= 200 && res.status < 300) {
		return res;
	} else {
		const error = new Error(`HTTP Error ${res.statusText}`);
		error.status = res.statusText;
		error.response = res;
		console.log(res.status, error);
		throw error;
	}
}

const parseJSON = res => res.json();