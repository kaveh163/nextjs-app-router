'use server';

import { saveMeal } from "./meals";
import { redirect } from 'next/navigation';
// all functions in this file are treated as server actions
// insures that the function is executed only on the server
    // server actions are async functions that are guaranteed to execute on the server and only there
    // assign the server action function as the value to action prop in form
    // nextjs creates a request and sends it to the nextjs server. so this function gets triggered,
    // and handles the form submission on the server.
  
export async function shareMeal(formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  await saveMeal(meal);
  redirect('/meals');
}