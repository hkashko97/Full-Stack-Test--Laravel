export default class Singleton {
    static counter = 0;

    static increment(){
        this.counter++;
        return this.counter;
    }

    static getValue(){
        return this.counter;
    }
}