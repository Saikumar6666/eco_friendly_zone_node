import { db } from "../dbConfig.js";
import { execQuery } from "../utils/dbUtil.js";

// 🔐 Login Model
export const loginMdl = function (signupData, callback) {
  const query = `SELECT * FROM user WHERE email = "${signupData.userEmail}"`;

  if (callback && typeof callback === "function") {
    execQuery(db, query, callback);
  } else {
    return execQuery(db, query);
  }
};

// 🧾 Registration Model
export const createUserMdl = function (userData, callback) {
  const {
    fullName,
    email,
    password,
    userType,
    address,
    mobileNo,
  } = userData;

  // Check if email already exists
  const checkEmailQuery = `SELECT COUNT(*) AS emailCount FROM user WHERE email = "${email}"`;

  execQuery(db, checkEmailQuery, function (err, results) {
    if (err) return callback(err, null);

    const emailCount = results[0].emailCount;

    if (emailCount > 0) {
      return callback(new Error("Email already exists"), null);
    } else {
      // Insert new user
      const insertUserQuery = `
        INSERT INTO user (full_name, email, password, user_type, address, mobile_no)
        VALUES ("${fullName}", "${email}", "${password}", "${userType}", "${address}", "${mobileNo}")
      `;

      execQuery(db, insertUserQuery, function (err, results) {
        if (callback && typeof callback === "function") {
          callback(err, results);
        } else {
          return err || results;
        }
      });
    }
  });
};
