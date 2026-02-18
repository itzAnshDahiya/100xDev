// Union and Intersection
// Union - ya tho ek ki properties hongi ya dusre ki ya fir sb ki
// Intersection - Dono ki properties honi chaiye


// Union Example
type GoodUser= {
    name: string,
    gift: string
};

type BadUser= {
    name: string,
    ip: string
};
type User = GoodUser | BadUser;

const user: User = {
    name: "SIddharth",
    ip: "asdasd",
    gift: "123123"
}





// Intersection Example
type Employee = {
    name: string,
    startDate: string
};

type Manager = {
    name: string, 
    department: string;
}

type TeamLead = Employee & Manager;

let e: Employee = {
    name: "Siddharth",
    startDate: "01-02-2004"
}

let m: Manager = {
    name: "Harkirat",
    department: "Electricity"
}
