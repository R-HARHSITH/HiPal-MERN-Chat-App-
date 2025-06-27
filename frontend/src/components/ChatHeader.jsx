// import React from 'react'
// import { X } from 'lucide-react'
// import { useAuthStore } from '../store/useAuthStore'
// import { useChatStore } from '../store/useChatStore'

// const ChatHeader = () => {
//     const {selectedUser,setSelectedUser}=useChatStore();
//     const {onlineUsers}=useAuthStore();
//   return (
//     <div className='p-2.5 border-b border-base-300'>
//         <div className='flex items-center justify-between'>
//             <div className='flex items-center gap-3'>
//                 {/* for avatar display */}
//                 <div className='avatar'>
//                     <div className='size-10 rounded-full relative'>
//                         <img src={selectedUser.profilePic||"/avatar.png"} alt={selectedUser.fullName}></img>
//                     </div>
//                 </div>
//                 {/* user information */}
//                 <div>
//                     <h3 className='font-medium'>{selectedUser.fullName}</h3>
//                     <p className="text-sm text-base-content/70">
//               {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
//             </p>
//                 </div>
//             </div>
//             <button onClick={() => setSelectedUser(null)}>
//           <X />
//         </button>
//         </div>
//     </div>
//   )
// }

// export default ChatHeader
// v2
import React from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const formattedDate = new Date(selectedUser.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className='header-height border-b border-base-300'>
      <div className='flex items-center justify-between header-padding'>
        <div className='flex items-center gap-5'>
          {/* Avatar Display */}
          <div className='avatar'>
            <div className='size-12 rounded-full relative'>
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className='object-cover w-12 h-12 rounded-full'
              />
              {/* {onlineUsers.includes(selectedUser._id) && (
                <span className='absolute bottom-0 right-0 size-4 bg-green-500 rounded-full ring-2 ring-white'></span>
              )} */}
            </div>
          </div>

          {/* User Information */}
          <div className='flex flex-col'>
            <h3 className='font-medium text-lg'>{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
            <p className='text-xs text-gray-500 mt-1'>
              Joined:{formattedDate}
            </p>
          </div>
        </div>

        {/* Chat Options */}
        <div className='flex items-center gap-3'>
          <button className='text-sm text-gray-500' onClick={() => setSelectedUser(null)}>
            <X />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;

