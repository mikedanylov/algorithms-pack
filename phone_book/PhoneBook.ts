/**
 * Created by mikedanylov on 10/8/16.
 */

export class PhoneBook {
    private namesMap: {[key:string]: string} = {};
    private numbersMap: {[key:string]: string} = {};

    public constructor () {}

    /**
     * Add contact to phone book with name and phone number
     * @param phoneNumber
     * @param contactName
     */
    public addContact (phoneNumber: string, contactName: string): void {
        this.namesMap[contactName] = phoneNumber;
        this.numbersMap[phoneNumber] = contactName;
    }

    /**
     * Delete contact from the phone book by number
     * @param phoneNumber
     */
    public deleteContact (phoneNumber: string): void {
        delete this.namesMap[this.numbersMap[phoneNumber]];
        delete this.numbersMap[phoneNumber];
    }

    /**
     * Look up the phone number by contact name
     * @param contactName
     * @returns {string}
     */
    public findContact (phoneNumber: string): string {
        let name = this.numbersMap[phoneNumber];
        return name ? name.toString() : 'not found';
    }
}