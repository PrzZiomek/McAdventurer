
export const fetchDestination = async (name: string) => {

   const res = await fetch("http://localhost:3000/api/destination", {
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
  });

  const resJson = res.json();
  return resJson;
}