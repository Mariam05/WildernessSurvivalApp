import { String, ObjectId, Long, Array, Object } from "bson";
import internal from "stream";
import Realm from "realm"

class Vital {
    _partition: String;
	_id?: ObjectId;
	name: String;
	periodicity?: Long;
	type: String;
	description?: String;
    data: Realm.List<String>;
    categories?: Realm.List<String>;
    timeElapsed?: Long;

	constructor({ name, periodicity, type, description, data, partition, categories, timeElapsed, id = new ObjectId() }) {
	    this._partition = partition;
		this._id = id;
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
		properties: {
			_id: "objectId?",
			_partition: "string",
			name: "string",
			periodicity: "int?",
			type: "string",
			description: "string?",
			data: "string[]",
			categories: "string[]",
			timeElapsed: "int",
		},
		primaryKey: "_id",
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
    vitals: Realm.List<Vital>;

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
			vitals: "Vital[]"
		},
		primaryKey: "_id",
		required: ["_partition"]
	};
}

export { Patient, Vital };
