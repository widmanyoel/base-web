
const saveToken = (token: string) =>{
    localStorage.setItem('base-web-token', token);
};

const getToken = () =>{
    const token = localStorage.getItem('base-web-token');
    if(token)
    {
        return token;
    }
    return null;
};
function deleteToken() {
    localStorage.removeItem('token');
  }
export {saveToken,getToken,deleteToken};
