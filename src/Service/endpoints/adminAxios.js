import { ADMIN_BASE_URL,PAN_BASE_URL } from "../../Utils/Config";

export const adminendpoints = {
    login:`${ADMIN_BASE_URL}/login`,
    clientlist:`${ADMIN_BASE_URL}/clientlist`,
    userlist:`${ADMIN_BASE_URL}/userlist`,
    createclient:`${ADMIN_BASE_URL}/clientRegister`,
    updateclient:`${ADMIN_BASE_URL}/updateclient`,
    createuser:`${ADMIN_BASE_URL}/userRegister`,
    updateuser:`${ADMIN_BASE_URL}/updateuser`,
    deletClient:`${ADMIN_BASE_URL}/deleteClient`,
    deletUser:`${ADMIN_BASE_URL}/deleteUser`,
    validatePan:`${PAN_BASE_URL}/api/validate-pan`,

};
