//let PORT_URL = "http://localhost:4000";
//let PORT_URL = "http://65.2.123.21";
let PORT_URL = "https://hirenxt-api-gwhpfddbfnc9d5dc.westus2-01.azurewebsites.net";

export const API_CONST = Object.freeze({
    LOGIN: PORT_URL + "/api/login",
    ADD_USER_MANAGEMENT: PORT_URL + "/api/add-user-management",
    GET_USER_MANAGEMENT: PORT_URL + "/api/get-user-management",
    ADD_TALENT_PROFILE: PORT_URL + "/api/add-talents-profiles",
    GET_TALENT_PROFILE: PORT_URL + "/api/get-talents-profiles",
    ADD_JOB_REQUIREMENTS: PORT_URL + "/api/add-job-requirements",
    GET_JOB_REQUIREMENTS: PORT_URL + "/api/get-job-requirements",
});
