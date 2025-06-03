import { getMockUser } from "../services/user.service.js";

export const getUserController = async (req, res) => {
    try {
        const user = await getMockUser();
        res.status(200).json(user)
    } catch (err) {
        const errMessage = 'Could not get track URL';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}
