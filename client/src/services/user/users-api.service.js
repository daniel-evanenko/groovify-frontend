import Api from '../api-service.js'

export async function getUser() {
    try {
        const { data: user } = await Api.get('/users');
        return user
    } catch (err) {
        console.error(err)
        throw err
    }
}
