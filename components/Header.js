import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // React-Date-Range, Main style file
import "react-date-range/dist/theme/default.css"; // React-Date-Range, Theme CSS file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder = "Start your search" }) {
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [guestNumber, setGuestNumber] = useState(2);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const resetInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        guestNumber,
      },
    });
  };

  function logit() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }

    watchScroll();

    return () => {
      window.removeEventListener("scroll", logit);
    };
  });

  return (
    <header
      className={`${
        router.pathname === "/" ? "fixed" : "sticky shadow-md"
      } w-full top-0 z-50 grid grid-cols-3 p-5 md:px-10 duration-300 bg-white ${
        router.pathname === "/" &&
        (scrollY > 0 ? "shadow-md" : "bg-transparent")
      }`}
    >
      {/* ### LEFT - Logo ### */}
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-10 cursor-pointer my-auto hover:scale-110 transition duration-150"
      >
        <Image
          src="/assets/images/airbnb-orange.svg"
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>

      {/* ### MIDDLE - Search Bar ### */}
      <div
        className={`flex items-center md:border-2 rounded-full py-2 md:shadow-sm focus-within:border-red-400 hover:border-red-400 transition duration-150 ease-out ${
          router.pathname === "/" &&
          (scrollY > 0 ? "" : "translate-y-24 scale-125")
        }`}
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder={placeholder}
          className={`bg-transparent flex-grow pl-5 outline-none text-sm ${
            router.pathname === "/" &&
            (scrollY > 0
              ? "text-gray-600 placeholder-gray-400"
              : "text-gray-300 placeholder-gray-300")
          }`}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2 hover:text-red-400 hover:bg-white hover:border-2 hover:border-red-400 transition duration-150" />
      </div>

      {/* ### RIGHT ### */}
      <div
        className={`flex items-center space-x-4 justify-end ${
          router.pathname === "/" &&
          (scrollY > 0 ? "text-gray-500" : "text-white")
        }`}
      >
        <p className="hidden md:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div
          className={`flex flex-col col-span-3 mx-auto bg-white p-5 rounded-b-3xl duration-150 ease-out ${
            router.pathname === "/" &&
            (scrollY > 0 ? "" : "translate-y-32 scale-110")
          }`}
        >
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />

          <div className="flex items-center border-bottom mb-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>

            <UsersIcon className="h-5" />
            <input
              type="number"
              value={guestNumber}
              onChange={(e) => setGuestNumber(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-red-400"
              min={1}
            />
          </div>

          <div className="flex">
            <button onClick={resetInput} className="flex-grow text-gray-500">
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
