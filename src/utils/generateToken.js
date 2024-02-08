import jwt from 'jsonwebtoken'

const generateToken = (id) => {
  return jwt.sign({ id }, 'abc123', {
    expiresIn: '3d',
  })
}

export default generateToken
