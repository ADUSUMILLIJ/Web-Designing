const bcrypt = require("bcrypt");
const { MongoClient } = require("mongodb");
const saltRounds = 10;
const uri = "mongodb+srv://Srikrishna:Srikrishna@cluster0.vv43y0v.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.createUser = async (userData) => {
  try {
    console.log('Before connecting to the database');
    await client.connect();

    console.log('Before hashing the password');
    userData.password = await getHash(userData.password);

    console.log('Before inserting into the database');
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .insertOne(userData);

    console.log('After inserting into the database');
    return "User added successfully";
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  } finally {
    await client.close();
  }
};



exports.validateUser = async (userCredentials) => {
  try {
    await client.connect();
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .findOne({
        email: userCredentials.email,
      });

    if (result) {
      const isValid = await checkPassword(
        userCredentials.password,
        result.password
      );

      if (isValid) {
        return {
          isValid: true,
          message: "User verified successfully",
        };
      } else {
        return {
          isValid: false,
          message: "User is invalid",
        };
      }
    } else {
      return {
        isValid: false,
        message: "User not found",
      };
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.updateUser = async (userData) => {
  try {
    await client.connect();
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .findOne({
        email: userData.email,
      });

    if (result) {
      result.name = userData.name;
      result.password = await getHash(userData.password);

      const filter = { email: userData.email };
      const options = { upsert: false };

      await client
        .db("UserDatabase")
        .collection("User")
        .updateOne(filter, { $set: result }, options);

      return "User updated successfully";
    } else {
      return "User not found";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.getUserByEmail = async (emailId) => {
  try {
    await client.connect();
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .findOne({
        email: emailId,
      });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.getAllUsers = async () => {
  try {
    await client.connect();
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .find({});
    let list = [];
    await result.forEach((item) => list.push(item));
    return list;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
};

exports.deleteUser = async (emailId) => {
  try {
    await client.connect();
    const query = { email: emailId };
    const result = await client
      .db("UserDatabase")
      .collection("User")
      .deleteOne(query);

    if (result.deletedCount === 1) {
      return "Deleted Successfully";
    } else {
      return "Deletion unsuccessful";
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.close();
  }
};

function getHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

async function checkPassword(newPwd, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(newPwd, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
