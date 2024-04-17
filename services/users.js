const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

module.exports = {
  createUser: async (name, email, password) => {
    try {
      let exist = await prisma.user.findUnique({ where: { email } })
      if (exist) throw "email sudah dipakai"

      let user = await prisma.user.create({ data: { name, email, password } })
      return user
    } catch (err) {
      throw err
    }
  },

  getUserById: async(id) => {
    try {
      let result = await prisma.user.findUnique({where:{id}})
      if (!result) throw 'id tidak terdaftar';
       
      
      return result

    } catch (error) {
      throw (error)
    }
  },

  getAuth: async(email, password) =>{
    try {
      let user = await prisma.user.findUnique({where: {email}})
      if(!user) throw 'email tidak terdaftar'
      if(user.password !== password) throw 'password salah'
      console.log(user);
     return {
       id: user.id,
       name: user.name,
       email: user.email,
       token: new Date().getTime(),
     }
    } catch (error) {
      throw error
    }
  }
}
