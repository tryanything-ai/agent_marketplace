import React, {
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useState,
} from "react";

import { Database } from "../utils/database.types";
type Agent = Database["public"]["Tables"]["items"]["Row"];
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export interface SearchContext {
  agents: Agent[];
  searching: boolean;
  searchValue: string;
  done: () => void;
  setSearchValue: (value: string) => void;
}

const SearchContext = React.createContext<SearchContext>({
  agents: [],
  searching: false,
  searchValue: "",
  done: () => null,
  setSearchValue: () => null,
});

type SeachProvderProps = {
  children: ReactNode;
};

export default function SearchProvider({ children }: SeachProvderProps) {
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const supabase = useSupabaseClient<Database>();

  const [agents, setAgents] = useState<Agent[]>([]);

  const done = () => {
    setSearching(false);
    setAgents([]);
    setSearchValue("");
  };

  const search = async () => {
    try {
      console.log("Searching for " + searchValue);

      let query = supabase
        .from("agents")
        .select("*")
        .ilike("name", `%${searchValue}%`);

      const { data, error } = await query;
      if (error) {
        throw error;
      }

      // setAgents(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (searchValue) {
      setSearching(true);
      search();
    } else {
      setSearching(false);
      setAgents([]);
    }
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{
        agents,
        searching,
        searchValue,
        setSearchValue,
        done,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
