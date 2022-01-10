import { ObjectId } from "bson";

interface VitalProps{
	name: string;
	periodicity?: number;
	type: string;
	description?: string;
	timeElapsed?: number;
	data: Reading[];
	categories?: string[];

}

interface ReadingProps {
	timestamp: string;
	value: any;
	url?: string;
}

class Reading {
	timestamp: string;
	value: any;
	url?: string;

	constructor(reading: ReadingProps) {
		this.timestamp = reading.timestamp;
		this.value = reading.value;
		this.url = reading.url ?? "";
	}

	static schema = {
		name: "Reading",
		properties: {
			timestamp: "string",
			value: "mixed",
			url: "string?",
		},
		embedded: true,
	}
}

class Vital{
	name: string;
	periodicity?: number;
	type: string;
	description?: string;
	timeElapsed?: number;
	data: Reading[];
	categories?: string[];

	constructor(vital: VitalProps) {
		this.name = vital.name;
		this.periodicity = vital.periodicity;
		this.type = vital.type;
		this.description = vital.description;
		this.data = vital.data;
		this.categories = vital.categories;
		this.timeElapsed = vital.timeElapsed;
	}

	static schema = {
		name: "Vital",
		properties: {
			name: "string",
			periodicity: "int?",
			type: "string",
			description: "string?",
			data: "Reading[]",
			categories: "string[]",
			timeElapsed: "int?",
		},
		embedded: true,
	};
}

class Patient {
	_partition: string;
	_id?: ObjectId;
	image?: number;
	name?: string;
	age?: string;
	sex?: string;
	vitals: Vital[];

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

export { Patient, Vital, Reading };
