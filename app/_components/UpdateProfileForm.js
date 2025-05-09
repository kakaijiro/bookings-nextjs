"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { updateGuest } from "../_lib/actions";
import SpinnerMini from "./SpinnerMini";

function UpdateProfileForm({ guest, children }) {
  const [count, setCount] = useState(0);

  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
    >
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          name="fullName"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          name="email"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          defaultValue={nationalID}
          name="nationalID"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button />
      </div>
    </form>
  );
}

// The hook useFormStatus only works if it's rendered inside the form that invokates a server action, that is, to get status of a server action is different from other components. Furthermore, because it's a hook, it must be a clinet component, that is "use client" must be decleared. If this file were for a server component, the componet Button should be defined in a separate file and be imported.
function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex min-h-16 w-48 items-center justify-center bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? <SpinnerMini /> : "Update profile"}
    </button>
  );
}

export default UpdateProfileForm;
