const MeetingHistory = require("../../model/schema/meeting");
const mongoose = require("mongoose");

const add = async (req, res) => {
	try {
		// Destructure meeting details from the request body
		const {
			agenda,
			attendes,
			attendesLead,
			location,
			related,
			dateTime,
			notes,
		} = req.body;

		console.log("body: ", req.body);

		// Create a new meeting document with the provided data and a created date
		const meeting = new MeetingHistory({
			agenda,
			attendes,
			attendesLead,
			location,
			related,
			dateTime,
			notes,
			createBy: req.user.userId,
			createdDate: new Date(),
		});

		// Save the meeting document to the database
		await meeting.save();

		console.log("meeting", meeting);
		// Return a successful response with the created meeting
		res.status(200).json({ message: "Meeting created successfully", meeting });
	} catch (error) {
		console.log("error: ", error.message);
		// In case of errors, return an error response
		res.status(500).json({ error: error.message });
	}
};

const index = async (req, res) => {};

const view = async (req, res) => {
	try {
		// Ensure that req.user exists from your authentication middleware.
		if (!req.user) {
			return res.status(401).json({ message: "Unauthorized access" });
		}

		// Fetch meetings only for the logged-in user.
		const meetings = await MeetingHistory.find({ createBy: req.user.userId });

		// Return the fetched meetings.
		res.status(200).json({ meetings });
	} catch (error) {
		// Return an error response if fetching fails.
		res.status(500).json({ error: error.message });
	}
};

const deleteData = async (req, res) => {};

const deleteMany = async (req, res) => {};

module.exports = { add, index, view, deleteData, deleteMany };
