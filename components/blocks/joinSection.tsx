import {  hasJoinRequest } from "@/lib/actions/userAction";
import JoinForm from "./join-form";
import Image from "next/image";
import Link from "next/link";

export default async function JoinSection() {
  const hasRequested = await hasJoinRequest();
 
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
          </div>
          <Link
            href={"/dashboard"}
            className="bg-foreground text-background hover:bg-foreground/90 block w-full lg:w-24 text-base rounded-lg py-2 px-4 text-center font-medium transition-all duration-200"
          >
            Refresh
          </Link>
        </div>
      ) : (
        <JoinForm />
      )}
    </div>
  );
}
