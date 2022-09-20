const {
  create,
  getEmployee,
  getPlayer,
  login,
  select_contact,
  select_email,
  select_nic,
  select_player,
} = require("./user.service");
const { compareSync } = require("bcrypt");
const jwt = require("jsonwebtoken");

let lengthed = 0;
let length_contact = 0;
let length_email = 0;
let length_nic = 0;
module.exports = {
  createUser: (req, res) => {
    const body = req.body;
   
      create(body, (err, results) => {
        if (err) {
          console.log("error :::::: ",err.sqlMessage);

          return res.json({
            success: 1,
            data: results,
            err: err.sqlMessage,
            // validate : validate
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
          err: null,
          // validate : validate
        });

      });
    
  },

  selectEmployees: (req, res) => {
    getEmployee((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  selectPlayer: (req, res) => {
    getPlayer((err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  
  loginn: (req, res) => {
    const body = req.body;
    // const salt = genSaltSync(10);
    // body.password = hashSync(body.password, salt);
    login(body.email, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid username or password",
        });
      } else {
        const result = compareSync(body.password, results.password);
        if (result) {
          const accessToken = jwt.sign(
            { nic: results.nic },
            process.env.TOKEN,
            { expiresIn: 60 * 60 * 24 }
          );
          console.log("passwords are matched");
          return res.json({
            success: 1,
            data: results,
            message: body.password,
            token: accessToken,
          });
        }
      }


    },

    
    );

  },

  showPlayer:(req, res) => {
    const data = req.body;
    select_player(data, (err, results)=>{
        if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Database connection error",
              data: body,
              err: err,
            });
          }

          return res.status(200).json({
            res_data:results,
          });
    });
  }
};


// fixed error and get right error message
