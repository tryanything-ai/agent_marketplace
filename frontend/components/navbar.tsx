import Link from "next/link";
import { SignInButton } from "ethos-connect";

const Navbar = ({ cta, href }: { cta: string; href: string }) => {
  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          Anything
        </Link>

        {/* <div className="flex-1">
          <Link href="/agents">
            <div className="btn btn-ghost normal-case text-md pl-5">Browse</div>
          </Link>
        </div> */}
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <Link href={href}>
            <li className=" btn btn-secondary mr-2">{cta}</li>
          </Link>

          <SignInButton className="btn btn-primary">Sign Up</SignInButton>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
