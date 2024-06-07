import getUserLinksService from "../infra/services/getUserLinks.service";

const getUserLinks = async(id: string):Promise<any> => {
    const res = await getUserLinksService(id);
    return res
}

export default getUserLinks