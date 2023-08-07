import Link from "next/link";
import { SignInButton } from "ethos-connect";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link href="/" className="">
          <img
            src="./anything.svg"
            alt="anything"
            className="h-14 w-14 md:hidden"
          />
          <img
            src="./anything-wide.svg"
            alt="anything"
            className="ml-4 w-60 md:block hidden"
          />
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <a
            href="https://github.com/tryanything-ai/anything"
            className="mr-4 my-auto"
          >
            <img
              src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
              alt="GitHub"
              height="35px"
              width="35px"
              className=""
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </a>

          {/* <a href="https://airtable.com/shrjY7LMyMPfJ3SGC">
            <li className=" btn btn-primary mr-2">List Agent</li>
          </a> */}

          {/* https://airtable.com/shr5g54cH7aU8875w */}
          {/* <SignInButton className="btn btn-primary">Sign Up</SignInButton> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
