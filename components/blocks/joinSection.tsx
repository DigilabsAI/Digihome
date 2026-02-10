import {  getUserFromJWT, hasJoinRequest } from "@/lib/actions/userAction";
import JoinForm from "./join-form";
import Image from "next/image";
import RefreshButton from "../ui/refresh-session-button";
import { redirect } from "next/navigation";

export default async function JoinSection() {
  const hasRequested = await hasJoinRequest();
 
   const user = await getUserFromJWT();
 
  if(user?.role !== "non-member"){
    console.log("redirecting to profile update")
    redirect("/profile/update");
  }

  return (
    <div>
      {hasRequested ? (
        <div className="text-xl md:text-2xl h-screen w-full flex flex-col items-center justify-center px-8">
          <div className="text-center">
            <Image
              src="/MessyDoodle.svg"
              alt="logo"
              width={400}
              height={400}
              className="mx-auto"
            />
            <div className="text-gray-500 font-light py-8 max-w-lg">
              Your application has been successfully submitted. Digilabs will
              reach out to you soon with further information.
            </div>
            <RefreshButton/>
          </div>
        </div>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}
