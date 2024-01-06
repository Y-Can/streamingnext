export function getAuthToken() {    
    const authToken = localStorage.getItem("token");   
    return authToken; 
}