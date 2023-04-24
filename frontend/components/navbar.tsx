import Link from "next/link";
import { SignInButton } from "ethos-connect";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Anything
        </Link>
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <a href="https://airtable.com/shrjY7LMyMPfJ3SGC">
            <li className=" btn btn-primary mr-2">List Agent</li>
          </a>
          <a
            href="https://airtable.com/shr5g54cH7aU8875w"
            target="_blank"
            rel="noopener noreferrer"
          >
            <li className=" btn btn-secondary mr-2">Get Updates</li>
          </a>
          {/* https://airtable.com/shr5g54cH7aU8875w */}
          {/* <SignInButton className="btn btn-primary">Sign Up</SignInButton> */}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
