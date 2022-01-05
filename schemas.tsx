import String, { ObjectId, Long } from "bson";
import internal from "stream";

class User {
	_partition: String;
	image: Long;
	firstName: String;
	lastName: String;

	constructor({ image, firstName, lastName, partition }) {
		this._partition = partition;
		this.image = image;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	static schema = {
		name: "User",
		properties: {
			_partition: "string",
			image: "int",
			firstName: "string",
			lastName: "string"
		},
		primaryKey: "_partition",
		required: ["_partition"]
	};
}

class Patient {
	_partition: String;
	_id?: ObjectId;
	image?: Long;
	name?: String;
	age?: String;
	sex?: String;

	constructor({ image, name, age, sex, partition, id = new ObjectId() }) {
		this._partition = partition;
		this._id = id;
		this.image = image;
		this.name = name;
		this.age = age;
		this.sex = sex;
	}

	static schema = {
		name: "Patient",
		properties: {
			_id: "objectId?",
			_partition: "string",
			image: "int?",
			name: "string?",
			age: "string?",
			sex: "string?",
		},
		primaryKey: "_id",
		required: ["_partition"]
	};
}

export { Patient };
