import { Database } from "../utils/database.types";
import Link from "next/link";
import { useSearch } from "../context/searchContext";
import { Popover, Transition } from "@headlessui/react";
type Agent = Database["public"]["Tables"]["agents"]["Row"];

const Search = ({
  className,
  mobile,
}: {
  className: string;
  mobile: boolean;
}) => {
  const { searchValue, setSearchValue, searching, agents, done } = useSearch();

  return (
    <div className={`form-control ${className}`}>
      <input
        type="text"
        placeholder="Search AI Agents"
        className="input input-bordered border-gray-400 text-gray-400 bg-inherit"
        value={searchValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchValue(event.target.value)
        }
      />
      {searching ? (
        <ul className="menu w-72 bg-base-100 rounded-box shadow-xl absolute mt-3 md:-ml-[72px] p-2 ">
          {agents.map((agent: Agent) => {
            if (mobile) {
              return (
                <Popover.Button
                  // className=" rounded-md overflow-clip"
                  className="block w-full p-2"
                  key={agent.id}
                  as={Link}
                  href={`/${agent.slug}`}
                  onClick={done}
                >
                  {agent.name}
                </Popover.Button>
              );
            } else {
              return (
                <Link
                  className="rounded-md overflow-clip"
                  key={agent.id}
                  href={`/${agent.slug}`}
                  onClick={done}
                >
                  <li>
                    <a>{agent.name}</a>
                  </li>
                </Link>
              );
            }
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Search;
