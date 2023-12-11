import { v4 as uuidv4 } from "uuid";
class User {
	constructor({ id, mail, password, pseudo, type }) {
		this.id = id || uuidv4();
		this.mail = mail;
        this.type = type
		this.password = password || null;
		this.pseudo = pseudo;
	}
}
export default User;
