const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const Exams = require('../../models/Exams');
const User = require('../../models/User');


router.post('/', admin, (req, res) => {
    const { date, time, courseName, centre, topicName } = req.body;

    const exam = new Exams({
        date: date,
        time: time,
        topicName: topicName,
        course: {
            'courseName': courseName,
            'centre': centre
        }
    });
    exam.save()
        .then(data => res.json(data));
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .then(user => {
            Exams.find({ course: { $in: user.coursesEnrolled } })
                .then(data => {
                    return res.status(200).json(data);
                })
                .catch(err2 => {
                    return res.status(400).json({ msg: "Something went wrong!" })
                })
        })
        .catch(err1 => {
            return res.status(400).json({ msg: "Something went wrong!" })
        })
});

router.get('/getall', admin, (req, res) => {
    Exams.find({})
        .then(exams => res.json(exams));
});

router.delete('/:id', admin, (req, res) => {
    Exams.findByIdAndDelete(req.params.id)
        .then(item => res.json({ success: true }))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;