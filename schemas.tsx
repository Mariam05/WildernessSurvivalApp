import { ObjectId } from "bson";

class Reading {
	timestamp: string;
	value?: any;
	url?: string;

	constructor({ timestamp = Date.now().toString(), value, url }) {
		this.timestamp = timestamp;
		this.value = value;
		this.url = url;
	}

	static schema = {
		name: "Reading",
		properties: {
			timestamp: "string",
			value: "mixed?",
			url: "string?",
		},
		embedded: true,
	}
}

class Vital {
	name: string;
	periodicity?: number;
	type: string;
	description?: string;
	timeElapsed?: number;
	data: Array<Reading>;
	categories: Array<String>;

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
		properties: {
			name: "string",
			periodicity: "int?",
			type: "string",
			description: "string?",
			data: { type: "list", objectType: "Reading" },
			timeElapsed: "int?",
		},
		embedded: true,
	};
}

class Patient extends Realm.Object {
	_partition: string;
	_id?: ObjectId;
	image?: number;
	name?: string;
	age?: string;
	sex?: string;
	vitals: Array<Vital>;

	constructor({ image, name, age, sex, partition, vitals, id = new ObjectId() }) {
		super();
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
			vitals: { type: "list", objectType: "Vital" }
		},
		primaryKey: "_id",
		required: ["_partition"]
	};
}

export { Patient, Vital, Reading };
