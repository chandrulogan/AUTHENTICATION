const bcrypt = require('bcryptjs')
const saltRound = 10

let hashPassword = async (password)=>{
    let salt = await bcrypt.genSalt(saltRound);
    // console.log('salt',salt);
    let hashPassword = await bcrypt.hash(password,salt)
    return hashPassword
}

let hashCompare = async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

module.exports = {hashPassword, hashCompare}