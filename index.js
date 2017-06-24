let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let path = require('path');

// mongoose.connect(process.env.PROD_MONGODB);
mongoose.connect('mongodb://localhost:27017/polls');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', () => console.log('mongodb connected'));

const Polls = require('./models/polls');
const Users = require('./models/users');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 3001));

// get all polls
app.get('/poll', (req, res) => {
	Polls.find({})
		.sort({voteNum: -1})
		.exec((err, polls) => {
		res.json(polls);
	});
});

// create new poll
app.post('/poll', (req, res) => {
	let newPoll = {
		author: req.body.author,
		topic: req.body.topic,
		options: req.body.options,
		voteNum: req.body.voteNum || 0,
		type: req.body.type || 'public'
	};
	let pollCreated = req.body.pollCreated;
	Polls.create(newPoll, (err, poll) => {
		if(err) {
			console.log(err); 
			res.json({message: err.message});
		} else {
			pollCreated.push(poll.id);
			Users.findByIdAndUpdate(req.body.userId, {pollCreated}, (err, user) => {
				if(err){
					console.log(err); res.end();
				} else {
					res.json({status: 'poll created', poll});
				}
			});
		}
	});
});

// update a poll for a new vote
app.put('/poll/:id', (req, res) => {
	let updatedPoll = {
		options: req.body.options,
		voteNum: req.body.voteNum
	};
	Users.findById(req.body.userId, (err, user) => {
		if(err) console.log(err);
		if(user.pollVoted.includes(req.params.id)){
			res.json({message: 'cannot vote again'});
		} 
		let updatedPollVoted = [...user.pollVoted, req.params.id];
		Polls.findByIdAndUpdate(req.params.id, updatedPoll, (err, poll) => {
			if(err) console.log(err);
			Users.findByIdAndUpdate(req.body.userId, {pollVoted: updatedPollVoted}, (err, user) => {
				if(err) console.log(err);
				res.json({status: 'poll updated', id: poll.id});
			})
		})
	})
});

// remove poll
app.delete('/poll/:id', (req, res) => {
	Polls.findByIdAndRemove(req.params.id, (err, poll) => {
		if(err){
			console.log(err);
			res.json({message: err.message});
		} else {
			let pollCreated = req.body.pollCreated;
			let index = pollCreated.findIndex(pollId => pollId === req.params.id);
			pollCreated = [...pollCreated.slice(0, index), ...pollCreated.slice(index + 1)];
			Users.findByIdAndUpdate(req.body.userId, {pollCreated}, (err, user) => {
				if(err){
					console.log(err); 
					res.end();
				} else {
					res.json({status: 'poll removed', id: poll.id});
				}
			});
		}
	});
});

// get all users
app.get('/users', (req, res) => {
	Users.find({}, (err, users) => {
		res.json(users);
	});
});

// get user by username (need to change to user authenticate)
app.get('/users/:username', (req, res) => {
	Users.findOne({username: req.params.username}, (err, user) => {
		res.json(user);
	});
});

// create new user
app.post('/users', (req, res) => {
	Users.create(req.body, (err, user) => {
		if(err) {
			console.log(err); 
			res.json({message: err.message});
		} else {
			res.json({status: 'user created'});
		}
	});
});

// detele user
app.delete('/users/:id', (req, res) => {
	Users.findByIdAndRemove(req.params.id, (err, user) => {
		if(err){
			console.log(err);
			res.json({message: err.message});
		} else {
			res.json({status: 'user removed'});
		}
	});
});

app.listen(app.get('port'), () => {
	console.log(`app running on port ${app.get('port')}`);
});