const UserModel = require("../model/user")
const reply = require("../helper/reply")
const { CoursesModel } = require("../model/courses")
const { GoalsModel } = require("../model/goals")
const { CollegeModel } = require("../model/college")
const { CountryModel } = require("../model/country")
const { TournamentModel } = require("../model/tournament")
const TeamModel = require("../model/team")
const Lang = require("../language/en")
const { StateModel } = require("../model/state")
const { CityModel } = require("../model/city")

const getProfile = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id }).select(['email', 'userName', 'createdAt', 'address', 'phoneNumber'])
        if (!user) {
            console.log(user)
            return res.status(402).json(reply.failure("User not exist "));
        }
        return res.status(200).json(reply.success("get profile", user))

    } catch (err) {
        return res.status(402).json(reply.failure(err.message))
    }
}

const getGoals = async (req, res) => {
    try {
        const goals = await GoalsModel.find()
        for (i = 0; i < goals.length; i++) {
            const courses_data = await CoursesModel.find({ goal_id: goals[i]._id })
            goals[i].course = courses_data

        }
        return res.json(goals)
    } catch (err) {
        res.send(err.message)
    }
}

const getCourse = async (req, res) => {
    try {
        const courses = await CoursesModel.findById({ _id: req.params.courseId })
        const colleges = await CollegeModel.find({ course_id: courses.id })
        return res.json({ colleges, courses })

    } catch (err) {
        res.status(402).json({ error: err.message });
    }
}

const gettournament = async (req, res) => {
    try {
        const tournament = await TournamentModel.find()
        return res.json(tournament)
    } catch (err) {
        res.send(err.message)
    }
}
const getcountry = async (req, res) => {
    try {
        const country = await CountryModel.find();
        return res.json(country)
    } catch (err) {
        res.send(err.message)
    }
}

const getstate = async (req, res) => {
    try {
        const state = await StateModel.find({ code: req.params.country });
        return res.json(state)
    } catch (err) {
        res.send(err.message)
    }
}

const getcity = async (req, res) => {
    try {
        const city = await CityModel.find({ state_id: req.params.state });
        return res.json(city)
    } catch (err) {
        res.send(err.message)
    }
}

const UpdateProfile = async (req, res) => {

    
}

const setteam = async (req, res) => {
    try {
        const {
            teamName,
            email,
            phoneNumber,
            noOfPlayers,
            substitute,
            homeGround,
            addressOfGround,
            pinCode,
            description,
            teamMembers,
            members,
        } = req.body


        const team = new TeamModel({
            user_id: req.user._id,
            teamName,
            email,
            phoneNumber,
            noOfPlayers,
            substitute,
            homeGround,
            addressOfGround,
            pinCode,
            description,
            teamMembers,
            members,
        })
        team.save();
        return (
            res.json(reply.success(Lang.REGISTER_SUCCESS, team._id))
        )
    } catch (err) {
        res.status(402).json({ error: err.message });


    }

}

module.exports = { getProfile, getGoals, getCourse, setteam, gettournament, getcountry, getstate, getcity, UpdateProfile }