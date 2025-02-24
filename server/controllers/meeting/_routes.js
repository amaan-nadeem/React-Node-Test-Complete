const express = require("express");
const meeting = require("./meeting");
const auth = require("../../middelwares/auth");

const router = express.Router();

router.post("/add", auth, meeting.add);
router.get("/", auth, meeting.view);
router.delete("/deleteData", auth, meeting.deleteData);
router.delete("/deleteMany", auth, meeting.deleteMany);

module.exports = router;
