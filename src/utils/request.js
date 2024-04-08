const API_DOMAIN=" http://192.168.1.4:3001/";
export const get=async(path)=>{
    const reponse=await fetch(API_DOMAIN+path);
    const result=await reponse.json();
    return result;
}
export const post = async (path,option) => {
    const responsive = await fetch(API_DOMAIN+path, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option),
    });
    const result = await responsive.json();
    return result;
};
export const del = async (path) => {
    const responsive = await fetch(API_DOMAIN+path, {
        method: "DELETE"
    });
    const result = await responsive.json();
    return result;
};
export const patch = async (path,option) => {
    const responsive = await fetch(API_DOMAIN+path, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(option),
    });
    const result = await responsive.json();
    return result;
} 