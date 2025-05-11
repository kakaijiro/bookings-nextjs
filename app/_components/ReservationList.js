"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import DeleteReservation from "./DeleteReservation";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => curBookings.filter((el) => el.id !== bookingId),
  );
  // useOptimistic enhances the performance of the UI by using the current state and the supposed state that's manually calculated. UI will update immediately based on the supposed state, and then if it fails to update in db, UI will revert to the current state. And, to synchronize them, we replace the array with the array that useOptimistic provides.
  // to do this, in a client component, that is, we use a hook, call useOptimistic with the parameters the current state and the supposed state. and then, within the handle function, we call both optimistic fn and mutation fn.
  // the above case is to delete an item. if to add an item, it would be like [...curBookings, newBooking].

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId); // delete on the UI based on the supposed state
    await deleteReservation(bookingId); // actually delete an item in db
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
