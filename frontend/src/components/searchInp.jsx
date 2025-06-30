import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import { useChatStore } from '../store/useChatStore.js';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const listRef = useRef(null);

  const { users, setSelectedUser } = useChatStore();

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (user) => {
    setSelectedUser(user);
    setSearch("");
    setSelectedIndex(-1);
    setShowMobileSearch(false); // Close popup on selection
  };

  const handleKeyDown = (e) => {
    if (!filteredUsers.length) return;

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex(prev => (prev + 1) % filteredUsers.length);
        break;
      case "ArrowUp":
        setSelectedIndex(prev => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        break;
      case "Enter":
        if (selectedIndex >= 0) {
          handleSelect(filteredUsers[selectedIndex]);
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedItem = listRef.current.children[selectedIndex];
      selectedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <div className="w-full px-0 md:px-4">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          placeholder="Search users..."
          className="hidden md:block input input-bordered rounded-full mt-3 w-full text-sm md:text-base"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-circle bg-purple-500 text-white mt-3 mr-1 hover:bg-black"
          onClick={() => {
            if (window.innerWidth < 1024) {
      setShowMobileSearch(true); // trigger popup only on mobile
    }
            else{
              if (!search.trim()) return; // Prevent action if input is empty
            if (filteredUsers.length > 0) {
              const user = selectedIndex >= 0 ? filteredUsers[selectedIndex] : filteredUsers[0];
              handleSelect(user);
            }
            }
          }}
        >
          <FaSearch />
        </button>
      </div>
      {showMobileSearch && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-start pt-20 px-4">
    <div className="relative bg-white rounded-lg p-4 shadow-md w-full max-w-md">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        onClick={() => setShowMobileSearch(false)}
        aria-label="Close search"
      >
        &times;
      </button>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search users..."
          className="flex-1 px-4 py-2 border rounded-full text-sm focus:outline-none"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          className="btn btn-circle bg-purple-500 text-white hover:bg-black"
          onClick={() => {
            if (!search.trim()) return;
            if (filteredUsers.length > 0) {
              const user = selectedIndex >= 0 ? filteredUsers[selectedIndex] : filteredUsers[0];
              handleSelect(user);
            }
          }}
        >
          <FaSearch />
        </button>
      </div>
      {search && (
        <ul
          className="mt-2 bg-base-100 border rounded-lg shadow-md max-h-60 overflow-y-auto w-full"
          ref={listRef}
        >
          {filteredUsers.length === 0 ? (
            <li className="p-2 text-center text-gray-400">No users found</li>
          ) : (
            filteredUsers.map((user, index) => (
              <li
                key={user._id}
                className={`p-2 cursor-pointer text-sm md:text-base ${
                  index === selectedIndex ? "bg-purple-200" : "hover:bg-sky-100"
                }`}
                onClick={() => {handleSelect(user);
                  setShowMobileSearch(false);
                }}
              >
                {user.fullName}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  </div>
)}

      {window.innerWidth > 1024 && search && (
        <ul
          className="mt-2 bg-base-100 border rounded-lg shadow-md max-h-60 overflow-y-auto w-full"
          ref={listRef}
        >
          {filteredUsers.length === 0 ? (
            <li className="p-2 text-center text-gray-400">No users found</li>
          ) : (
            filteredUsers.map((user, index) => (
              <li
                key={user._id}
                className={`p-2 cursor-pointer text-sm md:text-base ${
                  index === selectedIndex ? "bg-purple-200" : "hover:bg-sky-100"
                }`}
                onClick={() => handleSelect(user)}
              >
                {user.fullName}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;


// import React, { useState } from 'react';
// import { FaSearch } from "react-icons/fa";
// import toast from 'react-hot-toast';
// import { useChatStore } from '../store/useChatStore.js';

// const SearchInput = () => {
//   const [search, setSearch] = useState("");
//   const { users, setSelectedUser } = useChatStore();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!search.trim()) return;

//     const matchedUser = users.find(user =>
//       user.fullName.toLowerCase().includes(search.toLowerCase())
//     );

//     if (matchedUser) {
//       setSelectedUser(matchedUser);
//       setSearch("");
//     } else {
//       toast.error("No user found");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center gap-2">
//       <input
//         type="text"
//         placeholder="Search users..."
//         className="input input-bordered rounded-full mt-3"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <button
//         type="submit"
//         className="btn btn-circle bg-sky-500 text-white mt-3 mr-1 hover:bg-black"
//       >
//         <FaSearch />
//       </button>
//     </form>
//   );
// };

// export default SearchInput;
// 2
// import React, { useState, useEffect, useRef } from 'react';
// import { FaSearch } from "react-icons/fa";
// import { useChatStore } from '../store/useChatStore.js';

// const SearchInput = () => {
//   const [search, setSearch] = useState("");
//   const [selectedIndex, setSelectedIndex] = useState(-1);
//   const listRef = useRef(null);

//   const { users, setSelectedUser } = useChatStore();

//   const filteredUsers = users.filter(user =>
//     user.fullName.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelect = (user) => {
//     setSelectedUser(user);
//     setSearch("");
//     setSelectedIndex(-1);
//   };

//   const handleKeyDown = (e) => {
//     if (!filteredUsers.length) return;

//     switch (e.key) {
//       case "ArrowDown":
//         setSelectedIndex(prev => (prev + 1) % filteredUsers.length);
//         break;
//       case "ArrowUp":
//         setSelectedIndex(prev => (prev - 1 + filteredUsers.length) % filteredUsers.length);
//         break;
//       case "Enter":
//         if (selectedIndex >= 0) {
//           handleSelect(filteredUsers[selectedIndex]);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   useEffect(() => {
//     // Scroll to highlighted item
//     if (listRef.current && selectedIndex >= 0) {
//       const selectedItem = listRef.current.children[selectedIndex];
//       selectedItem?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//     }
//   }, [selectedIndex]);

//   return (
//     <div className="w-full">
//       <div className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search users..."
//           className="input input-bordered rounded-full mt-3 w-full"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//             setSelectedIndex(-1);
//           }}
//           onKeyDown={handleKeyDown}
//         />
//         <div
//           className="btn btn-circle bg-purple-500 text-white mt-3 mr-1 hover:bg-black"
//           onClick={() => {
//             if (filteredUsers.length > 0) {
//               const user = selectedIndex >= 0 ? filteredUsers[selectedIndex] : filteredUsers[0];
//               handleSelect(user);
//             }
//           }}
//         >
//           <FaSearch />
//         </div>
//       </div>

//       {search && (
//         <ul
//           className="mt-2 bg-base-100 border rounded-lg shadow-md max-h-60 overflow-y-auto"
//           ref={listRef}
//         >
//           {filteredUsers.length === 0 ? (
//             <li className="p-2 text-center text-gray-400">No users found</li>
//           ) : (
//             filteredUsers.map((user, index) => (
//               <li
//                 key={user._id}
//                 className={`p-2 cursor-pointer ${
//                   index === selectedIndex ? "bg-purple-200" : "hover:bg-sky-100"
//                 }`}
//                 onClick={() => handleSelect(user)}
//               >
//                 {user.fullName}
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default SearchInput;
// 3
