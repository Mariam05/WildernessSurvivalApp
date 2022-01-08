import { String, ObjectId, Long, Array, Date } from "bson";
import internal from "stream";


class Vital {
	name: String;
	periodicity?: Long;
	type: String;
	description?: String;
    timeElapsed?: Long;

	constructor({ name, periodicity, type, description, categories, data, timeElapsed }) {
		this.name = name;
		this.periodicity = periodicity;
		this.type = type;
		this.description = description;
		this.data = data;
		this.categories = categories;
		this.timeElapsed = timeElapsed;
	}

	static schema = {
		name: "Vital",
		bsonType: "object",
		properties: {
			name: "string",
			periodicity: "int?",
			type: "string",
			description: "string?",
			timeElapsed: "int",
		},
        embedded: true,
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
			vitals: { type: "list", objectType: "Vital"}
		},
		primaryKey: "_id",
		required: ["_partition"]
	};
}

export { Patient, Vital };
