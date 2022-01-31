import axios from "axios"
// const API_KEY = '2XfATHINJMuaC9JV'
// const API_SECRET = 'utjPmUCIvDOFhRPjP5UIMDvwp0G29qXE'
// Competitions List id = 362 - Fifa World Cup
// Competitions List id = 244 - UEFA Champions Leage
const API_ENDPOINT = "https://livescore-api.com/api-client/leagues/table.json?competition_id=244&key=2XfATHINJMuaC9JV&secret=utjPmUCIvDOFhRPjP5UIMDvwp0G29qXE"

exports.handler = async function(event, context) {
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