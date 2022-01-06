import { String, ObjectId, Long, Array, Date } from "bson";
import internal from "stream";


class Vital {
    _partition: String;
	_id?: ObjectId;
	name: String;
	periodicity?: Long;
	type: String;
	description?: String;
    categories?: Array;
    timeElapsed?: Long;

	constructor({ name, periodicity, type, description, partition, categories, data, timeElapsed, id = new ObjectId() }) {
	    this._partition = partition;
		this._id = id;
		this.name = name;
		this.periodicity = periodicity;
		this.type = type;
		this.description = description;
		this.categories = categories;
		this.timeElapsed = timeElapsed;
	}

	static schema = {
		name: "Vital",
		bsonType: "object",
		properties: {
			_id: "objectId?",
			_partition: "string",
			name: "string",
			periodicity: "int?",
			type: "string",
			description: "string?",
			categories: {type: "list",objectType: "string"},
			timeElapsed: "int",
		},
        embedded: true,
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
    vitals: Array;

	constructor({ image, name, age, sex, partition, vitals, id = new ObjectId() }) {
		this._partition = partition;
		this._id = id;
		this.image = image;
		this.name = name;
		this.age = age;
		this.sex = sex;
		this.vitals = vitals;
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
			vitals: { type: "list", objectType: "Vital"},
		},
		schema_version: "2",
		primaryKey: "_id",
		required: ["_partition"]
	};
}

export { Patient, Vital };
