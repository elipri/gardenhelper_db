var sql = require("./sql");

exports.index = function (req, res) {
  res.send("<h1>Hello</h1>");
};

exports.default = function (req, res) {
  res.status(404).send("Invalid route");
};

/* exports.users = function(req, res) {
    res.send('<h1>Kasutajad</h1>');
} */

exports.about = function (req, res) {
  res.send("<h1>About</h1>");
};

//Pärin kasutajaga seotud ülesanded
exports.tasks = function (req, res) {
  var query =
    "select Username, Task, Description from dbo.[Task] INNER JOIN AppUser ON Task.AppUserID = AppUser.UserID ";
  var uname = "";
  function isNumber(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
  }

  // If there's an ID passed along
  if (typeof req.params.id !== "undefined") {
    if (isNumber(req.params.id)) {
      //Vastuseks päringule selle UserID-ga kasutaja andmed
      query = query.concat(" where AppUserID=" + req.params.id);
    } else {
      //Vastuseks päringule selle kasutajanimega kasutaja andmed
      uname = req.params.id;
      query = query.concat(" where Username='" + uname + "'");
    }
  }

  var result = sql.querySql(
    query,
    function (data) {
      if (data !== undefined) {
        console.log("DATA rowsAffected: " + data.rowsAffected);
        res.send(data.recordset);
      }
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );
};

//Pärin kasutajaga seotud taimed
exports.plants = function (req, res) {
  var query =
    "SELECT Username, Plant, Place FROM ((dbo.[Plant] INNER JOIN dbo.[Place] ON Plant.PlaceID = Place.PlaceID) INNER JOIN dbo.[AppUser] ON Plant.AppUserID = AppUser.UserID) ";
  var uname = "";

  function isNumber(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
  }

  // If there's an ID passed along
  if (typeof req.params.id !== "undefined") {
    if (isNumber(req.params.id)) {
      //Vastuseks päringule selle UserID-ga kasutaja andmed
      query = query.concat(" where UserID=" + req.params.id);
    } else {
      //Vastuseks päringule selle kasutajanimega kasutaja andmed
      //Vastuseks päringule selle kasutajanimega kasutaja andmed
      uname = req.params.id;
      query = query.concat(" where Username='" + uname + "'");
    }
  }

  var result = sql.querySql(
    query,
    function (data) {
      if (data !== undefined) {
        console.log("DATA rowsAffected: " + data.rowsAffected);
        res.send(data.recordset);
      }
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );
};

//Pärin kasutajaga seotud kohad
//Pärin kasutaja kohtadega seotud taimed
exports.places = function (req, res) {
  var uname = "";
  var place = req.params.place;
  function isNumber(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
  }

  // If there's an ID passed along
  if (typeof req.params.id !== "undefined") {
    if (isNumber(req.params.id)) {
      var query =
        "SELECT Username, Place FROM ((dbo.[Plant] INNER JOIN dbo.[AppUser] ON Plant.AppUserID = AppUser.UserID) INNER JOIN Place ON Plant.PlaceID = Place.PlaceID) ";
      //Vastuseks päringule selle UserID-ga kasutaja andmed
      query = query.concat(" where AppUserID=" + req.params.id);
    } else {
      var query =
        "SELECT Username, Place FROM ((dbo.[Plant] INNER JOIN dbo.[AppUser] ON Plant.AppUserID = AppUser.UserID) INNER JOIN Place ON Plant.PlaceID = Place.PlaceID) ";
      //Vastuseks päringule selle kasutajanimega kasutaja andmed
      uname = req.params.id;
      query = query.concat(" where Username='" + uname + "'");
    }
  }

  if (typeof req.params.place !== "undefined") {
    var query =
      "SELECT Username, Plant, Place FROM ((dbo.[Plant] INNER JOIN dbo.[Place] ON Plant.PlaceID = Place.PlaceID) INNER JOIN AppUser ON Plant.AppUserID = AppUser.UserID) ";
    uname = req.params.id;
    query = query.concat(
      " where Username='" + uname + "' AND Place= '" + place + "'"
    );
  }

  var result = sql.querySql(
    query,
    function (data) {
      if (data !== undefined) {
        console.log("DATA rowsAffected: " + data.rowsAffected);
        res.send(data.recordset);
      }
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );
};

//Näitan kõiki kasutajaid
exports.users = function (req, res) {
  var query = "select * from dbo.[AppUser]";
  //Kas tegemist on numbriga?
  function isNumber(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
  }

  // If there's an ID passed along
  if (typeof req.params.id !== "undefined") {
    if (isNumber(req.params.id)) {
      //Vastuseks päringule selle UserID-ga kasutaja andmed
      query = query.concat(" where UserID=" + req.params.id);
    } else {
      //Vastuseks päringule selle kasutajanimega kasutaja andmed
      query = query.concat(" where Username='" + req.params.id + "'");
    }
  }

  var result = sql.querySql(
    query,
    function (data) {
      if (data !== undefined) {
        console.log("DATA rowsAffected: " + data.rowsAffected);
        res.send(data.recordset);
      }
    },
    function (err) {
      console.log("ERROR: " + err);
    }
  );
};

//API index
exports.apiIndex = function (req, res) {
  var vm = {
    // vm = View Model
    title: "API Functions",
    api: [
      { name: "Users", url: "/api/users" },
      { name: "Tasks", url: "/api/tasks" },
      { name: "Plants", url: "/api/plants" },
      { name: "Places", url: "/api/places" },
    ],
  };
  res.render("api-index", vm);
};
