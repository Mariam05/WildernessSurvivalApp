import { ObjectId } from "bson";

class Patient extends Realm.Object {
	_partition: String;
	_id?: ObjectId;
	image?: number;
	name?: string;
	age?: string;
	sex?: string;

	constructor({ image, name, age, sex, partition, id = new ObjectId() }) {
		super();
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
