import { String, ObjectId, Long, Array} from "bson";
import internal from "stream";
import Realm from "realm"

class Reading {


}


class Vital {
    _partition: String;
	_id?: ObjectId;
	name: String;
	periodicity: Long;
	type: String;
	description?: String;
    readings: Realm.List<String>;
    categories? : Realm.List<String>;
    hasImages : Bool;

	constructor({ name, periodicity, type, description, readings, partition, categories, hasImages, id = new ObjectId() }) {
	    this._partition = partition;
		this._id = id;
		this.name = name;
		this.periodicity = periodicity;
		this.type = type;
		this.description = description;
		this.readings = readings;
		this.categories = categories;
		this.hasImages = hasImages;
	}

	static schema = {
		name: "Vital",
		properties: {
			_id: "objectId?",
			_partition: "string",
			name: "string",
			periodicity: "int",
			type: "string",
			description: "string?",
			readings: "string[]",
			categories: "string[]",
			hasImages: "bool",
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
			vitals: "Vital[]"
		},
		primaryKey: "_id",
		required: ["_partition"]
	};
}




export { Patient, Vital };
