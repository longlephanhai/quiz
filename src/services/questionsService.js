import { get } from "../utils/request.js";
export const getListQuestion = async (id) => {
    const result = await get(`questions?topicId=${id}`)
    return result;
}