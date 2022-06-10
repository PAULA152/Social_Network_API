const { ObjectId } = require("mongoose").Types;
const res = require("express/lib/response");
const { Thought, User } = require("../models");

// const headCount = async () =>
//   User.aggregate()
//     .count('Count')
//     .then((numberOfUsers) => numberOfUsers);

// const grade = async (userId) =>
//   Student.aggregate([

//     { $match: { _id: ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(userId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  getUsers(req, res) {
    User.find()
      .then(async (users) => {
        //   const userObj = {
        //     users,
        //     headCount: await headCount(),
        //   };
        return res.json(users);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    console.log(req.params.userId);
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((userdata) => res.json(userdata))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user exists" })
          : Thought.findOneAndUpdate(
              { users: req.params.userId },
              { $pull: { users: req.params.userId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: "User deleted, but no courses found",
            })
          : res.json({ message: "User successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => res.json("User Deleted"))
      .catch((err) => res.status(500).json(err));
  },
};
