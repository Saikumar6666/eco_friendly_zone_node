export const execQuery = function (ConPool, Qry, values = [], callback) {
  if (callback && typeof callback === "function") {
    ConPool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        callback(err, null);
        return err;
      }

      connection.query(Qry, values, function (err, rows) {
        connection.release();
        if (err) {
          console.log("error2", err);
          callback(true, null);
          return;
        }
        callback(false, rows);
      });
    });
  } else {
    return new Promise(function (resolve, reject) {
      ConPool.getConnection(function (err, connection) {
        if (err) {
          console.log("err_work_progress", err);
          reject({ err_status: 500, err_message: "internal server" });
        } else {
          connection.query(Qry, values, function (err, rows) {
            connection.release();
            if (err) {
              console.log("err_work_progress", err);
              reject({ err_status: 500, err_message: "internal server" });
            } else {
              resolve(rows);
            }
          });
        }
      });
    });
  }
};
