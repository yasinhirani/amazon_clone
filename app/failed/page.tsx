"use client";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import React from "react";

function Failed() {
  const router = useRouter();

  return (
    <div className="bg-gray-100 flex-auto">
      <div className="w-full max-w-[60rem] mx-auto flex-grow">
        <div className="w-full p-5 bg-white mt-5 rounded-md">
          <div className="flex items-center space-x-4">
            <XCircleIcon className="text-red-500 w-10 h-10" />
            <h5 className="font-semibold text-2xl">
              Your transaction has been failed
            </h5>
          </div>
          <p className="mt-5 font-medium text-base">
            We are sorry, we are not able to process you order now due to some
            technical issue, if your money has been debited, then it will be
            refunded back to your account in 7 working days. Sorry for the inconvenience faced.
          </p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="btn-add-remove mt-5"
          >
            Go to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Failed;
