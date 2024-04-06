const User = require('./../modules/User.schema');


exports.GetUserById = async (req,res,next) => {
  try {
    const userId = res;
    const user = await User.findById(userId);
    console.log(user);
    if (user) {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};