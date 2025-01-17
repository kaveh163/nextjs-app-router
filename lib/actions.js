'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';
function isInvalidText(text) {
  // second check is when there is a text but the text is empty
  return !text || text.trim() === '';
}
// all functions in this file are treated as server actions
// insures that the function is executed only on the server
    // server actions are async functions that are guaranteed to execute on the server and only there
    // assign the server action function as the value to action prop in form
    // nextjs creates a request and sends it to the nextjs server. so this function gets triggered,
    // and handles the form submission on the server.
// useFormState will pass now two paramters to the shearMeal server action
export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    // return response objects
    // should be a serialized object
    // shouldn't include any methods. because they get lost while sending them to client.
    // but strings, numbers, nested objects or nested arrays will work.
    // return responses in server actions and handle them and handle them  with useFormState hook
    return {
      message: 'Invalid input.',
    };
  }

  await saveMeal(meal);
  // function below reserverd nextjs function. revalidate the cache that belongs to a certain route path.
  // only that path will be revalidated. no nested path.
  // so we provide a second argument 'layout' so all nested pages will be revalidated.
  // the default of revalidatePath second argument is page. so the page that belong to meals path would 
  // be revalidated
  // nextjs would through away the cache that is associated with those pages
  // used for static pages that depend on some data.
  // to revalidated all the pages of the website you could do revalidatedPath('/', layout)
  revalidatePath('/meals');
  redirect('/meals');
}