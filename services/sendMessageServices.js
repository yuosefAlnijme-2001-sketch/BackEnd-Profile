const Factore = require("./handelFactor");
const Message = require("../models/sendMessageModel");

//@desc Create Message
//@route POST /api/message
//@access Private
exports.CreateMessage = Factore.createOne(Message);

//@desc Get Message
//@route GET /api/message
//@access Public
exports.GetAllMessage = Factore.getAll(Message);

//@desc Get Message
//@route GET /api/message
//@access Bublic
exports.GetOneMessage = Factore.getOne(Message);

//@desc Update Message
//@route put /api/message
//@access Private
exports.UpdateMessage = Factore.updateOne(Message);

//@desc Delete Message
//@route delete /api/message
//@access Private
exports.DeleteMessage = Factore.deleteOne(Message);
