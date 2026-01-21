import {  hasJoinRequest } from "@/lib/actions/userAction";
import JoinForm from "./join-form";
import Image from "next/image";

export default async function JoinSection() {
  const hasRequested = await hasJoinRequest();

  return (
    <div>
      {hasRequested ? (
        <div className="text-xl md:text-2xl h-screen w-full flex items-center justify-center px-8">
          <div
            className="text-center"
          >
            <Image
              src="/MessyDoodle.svg"
              alt="logo"
              width={400}
              height={400}
              className="mx-auto"
            />
            <div className="text-gray-500 font-light py-10 max-w-lg">
              Your application has been successfully submitted. Digilabs will
              reach out to you soon with further information.
            </div>
          </div>
        </div>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}
