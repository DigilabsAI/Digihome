"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import CurrentYear from "./current-year";
import { motion } from "framer-motion";

export type FooterLink = {
  title: string;
  href: string;
};

export type FooterItem = {
  title: string;
  links: FooterLink[];
};

interface FooterProps {
  FooterData: FooterItem[];
}

const Footer = ({ FooterData }: FooterProps) => {
  return (
    <footer>
      <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
        <div className="col-span-full xl:col-span-2">
          {/* Logo */}
          <svg
            id="logo-7"
            width="124"
            height="32"
            viewBox="0 0 124 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ...SVG paths remain unchanged */}
          </svg>

          <p className="mt-4 text-muted-foreground">
            Design amazing digital experiences that create more happy in the
            world.
          </p>
        </div>

        {FooterData.map(({ title, links }) => (
          <div key={title}>
            <h6 className="font-medium">{title}</h6>
            <ul className="mt-6 space-y-4">
              {links.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Subscribe Newsletter */}
        <div className="col-span-2">
          <h6 className="font-medium">Stay up to date</h6>
          <form className="mt-6 flex items-center gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="grow max-w-64"
            />
            <Button>Subscribe</Button>
          </form>
        </div>
      </motion.div>

      <Separator />

      <div className="py-4 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
        <span className="text-muted-foreground">
          &copy; <CurrentYear />{" "}
          <Link href="/" target="_blank">
            Digilabs Solution
          </Link>
          . All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
