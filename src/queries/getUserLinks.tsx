import getUserLinksService from "../infra/services/getUserLinks.service";
import { Link } from "../types";

const getUserLinks = async(id: string, shouldSort: boolean, sortMethod: string, isAscending: boolean):Promise<Link[]> => {
    const res = await getUserLinksService(id, shouldSort, sortMethod, isAscending);
    return res as Link[]
}

export default getUserLinks