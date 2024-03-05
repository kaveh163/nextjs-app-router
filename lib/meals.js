import sql from 'better-sqlite3';
// connect to database
const db = sql('meals.db');

// use promises for loading.js
export async function getMeals() {
    // run() is used when we are inserting or changing data.
    // all() is used when fetching data and getting all rows fetched by that statement.
    // for getting single row use get().
    await new Promise((resolve)=> setTimeout(resolve, 2000));
    //throw new Error('Loading meals failed');
    return db.prepare('SELECT * FROM meals').all();
}