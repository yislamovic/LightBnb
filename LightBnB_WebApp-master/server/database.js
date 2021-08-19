const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool({
  user: 'yahyaislamovic',
  password: 'airman',
  host: 'localhost',
  database: 'lightbnb'
});

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
  
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const values = [id];
  const query = `
  SELECT *
  FROM USERS
  WHERE id = $1;`;
  return pool
    .query(query, values)
    .then((result) => {
      
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const values = [user.name, user.email, user.password];
  const query = `
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;`;
  return pool
    .query(query, values)
    .then((result) => {
      
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const values = [guest_id, limit];
  const query = `
  SELECT *
  FROM properties
  JOIN reservations ON property_id = properties.id
  WHERE reservations.guest_id = $1 
  LIMIT $2`;
  return pool
    .query(query, values)
    .then((result) => {
      
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
 const getAllProperties = (options, limit = 10) => {
  const queryParams = [];
  
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;
 
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night BETWEEN $${queryParams.length - 1} AND $${queryParams.length} `;
    
  }
  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `AND rating >= $${queryParams.length}`;
    
  }

  
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      
      return result.rows
    })
    .catch((err) => {
      console.log(err.message);
    });
};

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  
  const values = [property.title,
  property.description,
  property.number_of_bedrooms,
  property.number_of_bathrooms,
  property.parking_spaces,
  property.cost_per_night,
  property.thumbnail_photo_url,
  property.cover_photo_url,
  property.street,
  property.country,
  property.city,
  property.province,
  property.post_code,
  ];
  const query = `
  INSERT INTO properties (title,
  description,
  number_of_bedrooms,
  number_of_bathrooms,
  parking_spaces,
  cost_per_night,
  thumbnail_photo_url,
  cover_photo_url,
  street,
  country,
  city,
  province,
  post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;`;
  return pool
    .query(query, values)
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addProperty = addProperty;
