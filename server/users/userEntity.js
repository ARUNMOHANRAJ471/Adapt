const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const schema = new mongoose.Schema({
  empId: {
    type: String,
    required: true,
    unique: true
  },
  loginId: {
    type: String,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: 'wipro@123'
  },
  userType: {
    type: String,
    default: 'User',
    required: true
  },
  userDescription: {
      type: String,
      default: 'This is my Description'
    },
  picture: {
    type: String,
    default: 'default_profile.jpg'
},
  teamName: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  completedDomain: {
        type: Array,
      default: []
  },
  completedScenario: [
    {
      domainName: {
        type: String,
        default: ''
      },
      scenarioIds: {
        type: Array,
        default: []
      }
    }
  ],
  currentDomain: {
    type: String,
    default: ''
  },
  currentScenario: {
    type: String,
    default: ''
  },
  currentScenarioName: {
    type: String,
    default: ''
  },
  score: {
    type: Number,
    default: 0
  },
  statusInformation: [
      {
        scenarioId: String,
        state: String,
        status: String,
        componentState:{
          type:Array,
          default:[]
        },
        scenarioName: String,
        score: {
          type: Number,
          default: 0
        }
      }
    ]
});
let users = mongoose.model('users', schema);
module.exports = {
  users: users
};
