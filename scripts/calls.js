
export async function postUser(obj, url = "http://localhost:3000/users"){
    try {
        
        const data = {
            username: obj.username,
            firstName: obj.firstName,
            lastName: obj.lastName,
            password: obj.password,
            email: obj.email,
            gender: obj.gender,
            img: obj.img
        }

        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (response.ok){
            alert("You have succesfully registered")
        }
        else{
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.error(error)
    }
}