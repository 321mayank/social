const bcrypt = require('bcrypt')

const hashPassword = async (password,salt) => {
    
    return await bcrypt.hash(password, salt);
  };


module.exports={
    hashPassword
}