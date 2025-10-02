"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in to update your profile");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guest_Id);

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guest_Id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  //convert to a number because formData as strings
  const bookingId = Number(formData.get("bookingId"));
  //1)Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  //2)Authorization
  const guestBookings = await getBookings(session.user.guest_Id);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");
  //3)Building Update Data
  const updateData = {
    number_of_guests: formData.get("number_of_guests"),
    observations: formData.get("observations"),
  };

  //4)Mutation
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();
  // 5) Error Handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  //6) revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");
  //7) Redirecting
  redirect("/account/reservations");
}

export async function createBooking(bookingData, formData) {
  console.log("booking data", bookingData)
  console.log("formData", formData)
  //form data needs to be the last argument.
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guest_Id: session.user.guest_Id,
    number_of_nights: Number(bookingData.number_of_nights),
    number_of_guests: Number(formData.get("number_of_guests")),
    observations: formData.get("observations").slice(0, 1000),
    extras_price: 0,
    total_price: bookingData.cabin_price,
    has_paid: false,
    has_breakfast: false,
    status: "Unconfirmed",
  };

  console.log("new booking", newBooking);
  const { data, error } = await supabase.from("bookings").insert([newBooking]);
  // .select()
  // .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabin/${bookingData.cabin_Id}`);
  redirect("/cabins/thankyou");
}
