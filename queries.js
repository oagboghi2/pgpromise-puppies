const promise = require('bluebird');
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://localhost:5432/puppies';
const db = pgp(connectionString);

var options = {
  //Initialization options
  promiseLib: promise
}

// add query functions

function getAllPuppies(req, res, next){
  db.any('SELECT p.ID, p.name, b.name, p.age, p.sex FROM pups AS p INNER JOIN breeds AS b ON p.breed_ID = b.ID')
  .then(function(data){
    res.status(200).json({
      status: 'success',
      data:data,
      message: 'Retrieved All Puppies'
    })
  })
  .catch(function(err){
    return next(err);
  })
}

function getSinglePuppy(req, res, next){
  var pupID = parseInt(req.params.id);
  db.one('SELECT p.ID, p.name, b.name, p.age, p.sex FROM pups AS p INNER JOIN breeds AS b ON p.breed_ID = b.ID where p.id = $1', pupID)
  .then(function(data){
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retriving ONE puppy'
    })
    console.log(res)
  })
  .catch(function(err){
    return next(err)
  })
}

function createPuppy(req, res, next){
  req.body.age = parseInt(req.body.age);
  db.none('insert into pups(name, breed, age, sex)' + 'values(${name},${breed}, ${age}, ${sex})', req.body)
  .then(function(data){
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Inserted one puppy'
    })
  })
  .catch(function(err){
    return next(err)
  })
}

function updatePuppy(req, res, next){
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function removePuppy(req, res, next){
  var pupID = parseInt(req.params.id);
  db.result('DELETE FROM pups WHERE p.id=$1', pupID)
  .then(function(result){
    res.status(200).json({
      status: "status",
      message: `Removed ${result.rowCount} puppy`
    })
  })
  .catch(function(err){
    return next(err);
  })
}


module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
}
