const mongoose = require('.././config/mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const SALT = process.env.SALT_WORK_FACTOR;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email : {
        type: String,
        required: [true, 'Please enter Email Address'],
        index: true, 
        validate:{
          validator: validator.isEmail,
          message: '{VALUE} is not a valid email',
          isAsync: true
        },
        unique: true, //work for only uniqueValidator 
        //OR
        //validate: validateEmail  //custom validation
      },
    password :{
        type: String,
        required: true,
        //select: false
      },
    mobile:{
        type: String,
        required: true,
        minLength: [8, "no should have minimum 8 digits"],
        maxLength: [15, "no should have maximum 15 digits"],
      },
    verification:{
        type: String,
    },
    is_verified:{
      type: Boolean,
      default: false
    },
    status:{
      type: Boolean,
      default: true
    },
    is_deleted:{
      type: Boolean,
      default: false
    },
    token:{
      type:String,
      default : null
    },
    role:{
      type: String,
      enum: ["SUPERADMIN", "ADMIN", "USER"],
      required: true,
      index: true
    }
}, 
  {
    timestamps: true
  }
);

UserSchema.plugin(uniqueValidator);
async function validateEmail(email) {
  if (!validator.isEmail(email)) throw new Error("Please enter a valid email address.")
  const user = await this.constructor.findOne({ email })
  if (user) throw new Error("A user is already registered with this email address.")
}
const makeHashPassword = (user, salt, next) => {
  bcrypt.hash(user.password, salt, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
};
const genSalt = (user, next) => {
  bcrypt.genSalt(parseInt(SALT), function(err, salt) {
    if (err) return next(err);
    return makeHashPassword(user, salt, next);
  });
}
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  genSalt(user, next);
});
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>
      err ? cb(err) : cb(null, isMatch)
    )
}
const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;