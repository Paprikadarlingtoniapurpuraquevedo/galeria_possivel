const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    passwordChangedAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
        default: 'user'
    },
    passwordResetToken: {
        type: String
    }, 
    passwordResetExpires: {
        type: Date
    }
})

userSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err)

            this.password = hash
            next()
        })
    }
    else {
        next();
    }
})

userSchema.pre("findOneAndUpdate", async function (next) {
    try {
      if (this._update.password) {
        const hashed = await bcrypt.hash(this._update.password, 10);
        this._update.password = hashed;
      }
      next();
    } catch (err) {
      return next(err);
    }
})

userSchema.methods.comparePassword = async function(password) {
    if(!password) throw new Error('Falta a senha.')

    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Falha na comparação de senhas.', error.message)
    }    
}

userSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw new Error('Inválido')
    try {
    const user = await this.findOne({email})
    if(user) return false

    return true

    } catch (error) {
        console.log('Email em uso, tentar outro')
        return false
    }
}

module.exports = mongoose.model('User', userSchema)