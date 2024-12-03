export interface User {
    id:string
    name:string;
    email:string;
    password:string
}

export const users: User[] = [
    {
        id:"0",
        name: "Harry",
        email:"harry@gmail.co",
        password: "123456"
    },
    {
        id:"1",
        name: "Hareesh",
        email:"hareesh@gmail.co",
        password: "123456"
    },
    {
        id:"2",
        name: "Pranav",
        email:"pranav@gmail.co",
        password: "123456"
    }
]

export const addUser = (user:User) => {
    const isUserAvailable = findUserByEmailPassword(user.email,user.password)

    if(!isUserAvailable){
        users.push(user)
    }
}
// export const findUser = (id:string) => {}
export const findUserByEmailPassword = (email:string,password:string) =>  users.find((u)=> u.email === email && u.password === password)

// export const deleteUser = (id:string) => {}