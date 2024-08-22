import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeData } from "../redux/features/employeeSlice";
import SearchBar from "./SearchBar";
import { MdManageSearch } from "react-icons/md";

export default function Data() {
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.employee);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    dispatch(fetchEmployeeData());
  }, [dispatch]);

  const Employeedata = data.data || [];

  useEffect(() => {
    if (input.trim() === "") {
      setSearch([]);
    }
  }, [input]);

  const handleSearch = () => {
    if (input.trim() === "") {
      setSearch([]);
    } else {
      const searchResults = Employeedata.filter((item) =>
        item.name.toLowerCase().includes(input.toLowerCase().trim())
      );
      setSearch(searchResults);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="sm:-mx-6 lg:mx-2">
        <h1 className="py-2 px-6 lg:px-14 font-bold text-primary text-xl">
          All Employees
        </h1>
        <div className="py-2 pl-6 lg:pl-14 flex items-center">
          <SearchBar
            setInput={setInput}
            input={input}
            handleKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="bg-primary rounded-lg h-8 w-8 flex justify-center items-center -ml-5"
          >
            <MdManageSearch className="text-white text-2xl" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light ">
                <thead className="border-b border-neutral-300 font-medium ">
                  <tr>
                    <th scope="col" className="px-5 py-4">
                      #
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Phone No
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Designation
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : search.length === 0 ? (
                    // Display default data when search is empty
                    <>
                      {Employeedata.map((item, i) => (
                        <tr
                          key={i}
                          className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100  "
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.phone}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.designation}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.email}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      {search.map((item, i) => (
                        <tr
                          key={i}
                          className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 "
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {i + 1}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.phone}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.designation}
                          </td>
                          <td className="whitespace-nowrap px-5 py-4">
                            {item.email}
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
