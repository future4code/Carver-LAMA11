export class Band{
    constructor(
    private id: string,
    private name: string,
    private gender: string,
    private leader: string,
    
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getGender(){
        return this.gender;
    }

    getLeader(){
        return this.leader;
    }

    setId(id: string){
        this.id = id;
    }

    setName(name: string){
        this.name = name;
    }

    setEmail(gender: string){
        this.gender = gender;
    }

    static toUserModel(user: any): Band {
        return new Band(user.id, user.name, user.gender, user.leader);
    }
}