const Chat = require("../model/chatModel.js");

const deleteAll = async (req, res) => {
  try {
    await Chat.DeleteAllMessages();

    return res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  deleteAll,
};
