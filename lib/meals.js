// api provided by node.js
import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // throw new Error('Loading meals failed');
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    // create a slug by using slugify
    // pass a configuration object as argument to slugify
    // forces all characters to be lower case
  meal.slug = slugify(meal.title, { lower: true });
    //xss to sanitize the content that is sent by user. since meal instructions are added in 
    //  dangerouslySetInnerHTML inside mealSlug folder, exposing it to cross site scripting attacks

  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split('.').pop();
  const fileName = `${meal.slug}.${extension}`;
  // any images stored in images folder is publicly availabe. they can be rendered without problems
  // createWriteStream creates a stream for writing data to that specific file.
  // createWriteStream gets a path as argument.
  // stream object to write to that path. so to that image in that path.
  const stream = fs.createWriteStream(`public/images/${fileName}`);
// meal.image has an arrayBuffer method to convert the image to a buffer which is array buffer
  const bufferedImage = await meal.image.arrayBuffer();
// stream.write function needs a chunk as argument
// strea.write needs a regular buffer so we us Buffer.from
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });
// all requests to the images will be stored in the public folder automactically
  meal.image = `/images/${fileName}`;

  db.prepare(`
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `).run(meal);
}