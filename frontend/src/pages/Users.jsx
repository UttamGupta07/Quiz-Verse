import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaTrash } from "react-icons/fa";

const Users = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3030/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
    } catch (err) {
      console.log(err);
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    const result = users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(result);
  }, [search, users]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3030/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsers();
    } catch (err) {
      console.log(err);
      alert("Unable to delete user");
    }
  };

  const navigate = useNavigate();

const handleView = (id) => {
  navigate(`/admin/users/${id}`);
};

  return (
    <div className="space-y-6">

      {/* Heading */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-gray-800">
          Users
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-indigo-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="text-left">
                Email
              </th>

              <th className="text-left">
                Joined
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (

              <tr>

                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500"
                >
                  No Users Found
                </td>

              </tr>

            ) : (

              filteredUsers.map((user) => (

                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <div className="flex justify-center gap-4">

                     <button
  onClick={() => 
    handleView(user._id)}
  className="text-blue-600 hover:text-blue-800 text-lg"
>
  <FaEye />
</button>

                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        className="text-red-600 hover:text-red-800 text-lg"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Users;