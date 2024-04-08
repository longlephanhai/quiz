import { getCookie } from "../helpers/cookie.js";
import { get } from "../utils/request.js";
export const getAnswersByUserId = async () => {
    const id=getCookie("id");
    const result = await get(`answers?userId=${id}`)
    return result;
}
export const getAnswersResult= async (id) => {
    const result = await get(`answers/${id}`)
    return result;
}