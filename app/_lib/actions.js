"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID.");
  // we use the nearest error boundary, instead of a try catch block

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile"); // revalidate cashe
}

export async function createReservation(bookingData, formData) {
  // by using .bind(null, data), the 1st argument is the data that's binded in this case. All the time, formData is the last argument.

  // authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // create newBooking data
  const newReservation = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  // create new reservation
  const { error } = await supabase.from("bookings").insert([newReservation]);
  if (error) throw new Error("Booking could not be created");

  // revalidate
  revalidatePath(`/cabin/${bookingData.cabinId}`);

  // redirect to a thank you page
  redirect("/cabins/thankyou");
}

export async function updateReservation(formData) {
  // authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // authrization
  const reservationId = Number(formData.get("reservationId"));
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(reservationId))
    throw new Error("You are not allowed to edit this booking.");

  // fetch data
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0, 1000); // "slice" prevents a user from putting tons of characters in db.

  // edit the item
  const updatedFields = { numGuests, observations };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", reservationId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // error handle
  if (error) throw new Error("Booking could not be edited");

  // revalidate cache
  revalidatePath(`/account/reservations/${reservationId}`);
  revalidatePath(`/account/reservations`);

  // redirect
  redirect("/account/reservations");
}

export async function deleteReservation(bookingId) {
  // test
  // await new Promise((res) => setTimeout(res, 5000));
  // throw new Error();

  // authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  // confirm whether the guest owns the reservation
  // IMPORTANT: auth is not enough. an authenticated guest may try to delete others' reservations.
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");

  // delete an item
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
