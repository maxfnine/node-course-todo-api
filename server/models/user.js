const _=require('lodash');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: `{VALUE} is not valid email`
        }
    },
    password: {
        type: 'String',
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: 'String',
            required: true
        },
        token: {
            type: 'String',
            required: true
        }
    }]

});

UserSchema.methods.generateAuthToken = function (){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
    user.tokens=[{access,token }];
    user.save().then(() => {
        return token;
    });
};

UserSchema.methods.toJSON = function(){
 return _.pick(this,['_id','email'])
};

UserSchema.methods.removeToken = function(token){
var user = this;
return user.update({
    $pull:{
        tokens:
        {
            token
        }
    }
});
};

UserSchema.statics.findByToken = function(token)
{
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (e) {
       return Promise.reject();
    }
    return User.findOne({
        _id:decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    });
};

UserSchema.statics.findByCredentials = function(email,password){
var User=this;
return User.findOne({email}).then((user)=>{
    if(!user)
    {
        Promise.reject();
    }

    return new Promise((resolve,reject)=>{
     bcrypt.compare(password, user.password, (err, res) => {
         if(res)
         {
            resolve(user);
         }
         else{
             reject(err);
         }

     });
    });

});
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        var password = user.password;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                user.password=hash;
                next();
            });
        });
    }
    else {
        next();
    }
})

var User = mongoose.model('User', UserSchema);



module.exports = {
    User
};