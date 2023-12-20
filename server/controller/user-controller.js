const User = require("../model/User");

const getUsers = async (req, res) => {

  User.find({ _id: { $ne: '658286d2943ce883fbe9c68e' } })
  .then(users => {
    res.json({
        users,
        ok: true
    });
  }).catch(err => {
    console.log('Error while Getting data:', err);
    res.status(500)
    .json({
      message: 'Failed to retrieve events data',
      ok: false
    });
  });
};

// save an user
const addUser = async (req, res) => {
  try {
    const savedUser = await User.create(req.body);
    res.json({
      event: savedUser,
      ok: true
    });
  } catch (err) {
    console.log('Error while Posting data:', err);
    res.status(500)
    .json({
      message: 'Failed to create an user',
      ok: false
    });
  }
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.json({
            event: updatedUser,
            ok: true
        });

    } catch (err) {
        // console.log('Error while trying to update data:', err);
        res.status(500)
        .json({
        message: 'Failed to update an user',
        ok: false
        });
    }
};


const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    
    const deleted = await User.findByIdAndDelete(userId, { new: true });
    res.json({
      event: deleted,
      ok: deleted !== null
    });
    
  } catch (err) {
    console.log('Error while trying to delete data:', err);
    res.status(500)
    .json({
      message: 'Failed to delete an user',
      ok: false
    });
  }
};

module.exports = { getUsers, addUser, updateUser, deleteUser };