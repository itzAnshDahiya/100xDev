interface User {
    name: string;
    age: number;
    address: {
        city: string;
        country: string;
        Pincode: number;
    };
}
let user: User = {
    name: "Siddharth",
    age : 21,
    address: {
        city: "Chandigarh",
        country: "India",
        Pincode: 156005
    }
}

function isLegalAge(age: number): boolean{
    return age >= 18;
}

function isLegal(user: User): boolean {
    if( user.age >=18){
        return true;
    }else{
        return false;
    }
}

const ans = isLegal(user);
if(ans){
    console.log("I am Legal")
}else{
    console.log("I am Illegal")
}



/*
interface User {
name: string;
age: number;
isLegal(): boolean;
}

class Manager implements User{
name: string;
age: number;
constructor( name: string , age: number){
this.name = name;
this.age = age;
}

isLegal(){
return this.age > 18
}
}

class God extends Manager {
constructor{name: string , age: number}{
super(name, age)
}
}
*/