
"use client";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Model from "@/components/Model";
import { useDispatch } from "react-redux";
import { addEmployeeData } from "@/redux/features/addemployeeSlice";
import { toast } from "../../utils/toastify";
import { useSession } from "next-auth/react";
import { fetchUserEmployeeData } from "@/redux/features/getuseremployeeSlice";
import { deleteEmployeeData } from "@/redux/features/deleteemployee";
import { updateEmployeeData } from "@/redux/features/updateemployeeSlice";
import { redirect } from "next/navigation";

export default function YourEmployee() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [emploading, setEmpLoading] = useState(true);
  const [delLoading, setDelLoading]: any = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const { status, data }: any = useSession();
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    designation: "",
    phone: "",
  });

  if (status == "unauthenticated") {
    redirect("/");
  }

  const onClose = () => {
    setIsOpen(false);
    setIsUpdate(false);
    setFormData({
      name: "",
      email: "",
      designation: "",
      phone: "",
    });
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    try {
      const formDataWithUserId = { ...formData, userid: data?.user?.id };
      const responce = await dispatch(addEmployeeData(formDataWithUserId));
      if (responce?.payload?.message == "Error while adding Employee") {
        return toast.error("Error while adding Employee");
      }
      if (
        responce?.payload?.message ==
        "Email already exists. Please choose a different email."
      ) {
        return toast.error(
          "Email already exists. Please choose a different email."
        );
      }
      if (responce?.payload?.message == "Employee added successfully") {
        fetchUserEmployee();
        onClose();
        return toast.success("Employee added successfully");
      }
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      toast.error("Error while adding Employee");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEmployee = () => {
    dispatch(fetchUserEmployeeData(data?.user?.id))
      .unwrap()
      .then((response: any) => {
        setEmployees(response.employee);
        setEmpLoading(false);
      })
      .catch((error: any) => {
        console.log("error", error);
        setEmpLoading(false);
      });
  };

  useEffect(() => {
    fetchUserEmployee();
  }, [data]);

  const deleteEmployee = async (id: any) => {
    try {
      setDelLoading((prev: any) => ({ ...prev, [id]: true }));
      const responce = await dispatch(deleteEmployeeData(id));
      if (responce.payload.message == "Employee Delete successfully") {
        fetchUserEmployee();
        return toast.success("Employee Delete successfully");
      } else {
        return toast.error("Error while deleting Employee");
      }
    } catch (error) {
      console.log("error", error);
      return toast.error("Error while deleting Employee");
    } finally {
      setDelLoading((prev: any) => ({ ...prev, [id]: false }));
    }
  };

  const handleupdateEmployee = async (employee: any) => {
    setIsOpen(true);
    setIsUpdate(true);
    setEditingEmployee(employee);
    setFormData({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      designation: employee.designation,
      phone: employee.phone,
    });
  };

  const updateEmployee = async () => {
    try {
      setLoading(true);
      const responce: any = await dispatch(updateEmployeeData(formData));
      if (responce?.payload?.message == "Error while updating employee data") {
        return toast.error("Error while updating employee data");
      }
      if (responce?.payload?.message == "Employee updated successfully") {
        fetchUserEmployee();
        onClose();
        return toast.success("Employee updated successfully");
      }
    } catch (error) {
      console.log("error", error);
      return toast.error("Error while updating Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <div className=" sm:-mx-6 lg:mx-2">
        <div className="flex justify-between  flex-wrap">
          <h1 className="py-2 px-6 lg:px-14 font-bold ml-4 text-primary text-xl">
            Your Employees {data?.user?.name}
          </h1>
          <div className="flex items-center mx-5">
            <button className="bg-red-500 flex items-center rounded-lg text-white text-sm px-2 py-2 mr-2">
              <MdOutlineDeleteOutline />
              Delete
            </button>
            <button
              onClick={() => setIsOpen(true)}
              disabled={loading}
              className="bg-primary flex items-center gap-2 text-white font-semibold py-2 px-2 text-sm rounded-xl sm:mr-6 lg:mr-14"
            >
              <IoPersonAddOutline className="text-xl" />
              Add Employee
            </button>
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface ">
                <thead className="border-b border-neutral-200 font-medium ">
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
                      designation
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-5 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {emploading ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        Loading...
                      </td>
                    </tr>
                  ) : employees?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    <>
                      {employees?.map((item: any, i) => {
                        return (
                          <tr
                            key={i}
                            className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {i + 1}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              {item?.name}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              {item?.phone}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              {item?.designation}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4">
                              {item?.email}
                            </td>
                            <td className="whitespace-nowrap px-5 py-4 flex">
                              <button
                                onClick={() => handleupdateEmployee(item)}
                              >
                                <CiEdit className="text-primary text-xl" />
                              </button>
                              {delLoading[item.id] ? (
                                <div
                                  className="ml-3 animate-spin size-4 border-[3px] border-current border-t-transparent text-primary rounded-full "
                                  role="status"
                                  aria-label="loading"
                                ></div>
                              ) : (
                                <button
                                  onClick={() => deleteEmployee(item.id)}
                                  className="text-red-500 ml-2 text-xl"
                                >
                                  <MdOutlineDeleteOutline />
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Model
        isOpen={isOpen}
        onClose={onClose}
        onAddEmployee={handleAddEmployee}
        loading={loading}
        formData={formData}
        setFormData={setFormData}
        isUpdate={isUpdate}
        updateEmployee={updateEmployee}
      />
    </div>
  );
}
