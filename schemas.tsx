import { String, Object, ObjectId, Long, Array, Mixed } from "bson";
import internal from "stream";

class Reading {
    timestamp: String;
    value?: Mixed;
    url?: String;

    constructor({timestamp=Date.now(), value, url}){
        this.timestamp = timestamp;
        this.value = value;
        this.url = url;
    }

    static schema = {
        name: "Reading",
        bsonType: "object",
        properties: {
            timestamp: "string",
            value: "mixed?",
            url: "string?",
        },
        embedded: true,
    }
}

class Vital {
	name: String;
	periodicity?: Long;
	type: String;
	description?: String;
    timeElapsed?: Long;
    data: Array;

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
			data: { type: "list", objectType: "Reading"},
			timeElapsed: "int?",
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

export { Patient, Vital, Reading };
