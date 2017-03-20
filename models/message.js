"use strict";

let connection = require('../config/db.js');

let moment = require('moment')

class Message{
	
	constructor (row){
		this.row = row
	}
	
	get content() {
		return this.row.content
	}
	
	get date(){
		return moment(this.row.date)
	}
	
	static create(content, callback){
		connection.query('INSERT INTO messages SET content = ?, date = ?', [content, new Date()], (err, result) =>{
			if(err) throw err
			
			callback(result)
		})
		
	}
	
	static all(callback){
		connection.query('SELECT * FROM messages', (err, rows) => {
			if(err) throw err
			
			callback(rows.map((row) => new Message(row)))
		})
	}
}

module.exports = Message