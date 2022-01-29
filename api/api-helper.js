import axios from "axios"
const API_ENDPOINT = "https://livescore-api.com/api-client/competitions/list.json&key=2XfATHINJMuaC9JV&secret=utjPmUCIvDOFhRPjP5UIMDvwp0G29qXE"

export default async function handler(event, context) {
	try {
		const response = await axios.get(API_ENDPOINT, { headers: { Accept: "application/json" } })
		const data = response.data
		return {
			statusCode: 200,
			body: JSON.stringify({ msg: data })
		}
	} catch (err) {
		console.log(err) // output to netlify function log
		return {
			statusCode: 500,
			body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
		}
	}
}