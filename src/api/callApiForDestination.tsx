
export const callApiForDestination = (name: string) => { 

    fetch("http://localhost:3000/api/destination", {
        method: "POST",
            headers:{
               // "Cookie": "login=true",              !!! to set
                "Content-Type": "application/json",
               // "Authorization": "Bearer " + token,  !!! to set
            },
            body: JSON.stringify({
                destination: {
                    name,
                }
            })           
    })
    .then(res => res.json())
    .then(resData => console.log(resData))
    .catch(err => console.log(err))

}

