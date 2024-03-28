const userModel = require("../models/model");

// Handle unhandled promise rejections globally
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});


exports.createUser = async (userData) => {
  const result = await userModel.createUser(userData);
  return result;
};

exports.validateUser = async (userCredentials) => {
  const result = await userModel.validateUser(userCredentials);
  return result;
};

exports.updateUser = async (userData) => {
  const result = await userModel.updateUser(userData);
  return result;
};

exports.getUserByEmail = async (emailId) => {
  const result = await userModel.getUserByEmail(emailId);
  return result;
};

exports.getAllUsers = async () => {
  const result = await userModel.getAllUsers();
  return result;
};

exports.deleteUser = async (emailId) => {
  const result = await userModel.deleteUser(emailId);
  return result;
};
