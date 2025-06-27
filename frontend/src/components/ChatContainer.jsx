// import React, { useEffect } from 'react'
// import { useChatStore } from '../store/useChatStore.js'
// import ChatHeader from './ChatHeader.jsx';
// import MessageInput from './MessageInput.jsx';
// import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
// import { useAuthStore } from '../store/useAuthStore.js';
// import { formatMessageTime } from '../lib/utils.js';

// const ChatContainer = () => {
//   const {messages,getMessages,isMessagesLoading,selectedUser}=useChatStore();
//   const {authUser}=useAuthStore();

//   useEffect(()=>{
//     getMessages(selectedUser._id);
//   },[selectedUser._id,getMessages]);
//   if(isMessagesLoading) {
//     return (
//       <div className='flex-l flex flex-col overflow-auto'>
//         <ChatHeader/>
//         <MessageSkeleton/>
//         <MessageInput/>
//       </div>
//     )
//   }
//   return (
//     <div className='flex-1 flex flex-col overflow-auto'>
//       <ChatHeader/>
//       <div className='flex-1 overflow-y-auto p-4 space-y-4'>
//         {messages.map((message)=>(
//            <div key={message._id}
//            className={`chat${message.senderId===authUser._id?"chat-start":"chat-end"}`}>
//            <div className='chat-image avatar'>
//             <div className='size-10 rounded-full border'> 
//               <img
//               src={message.senderId===authUser._id?authUser.profilePic || "/avatar.png":selectedUser.profilePic||"/avatar.png"}
//               alt="profile pic"
//               >
//               </img>
//             </div>
//            </div>
//            <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>

//          </div>
//         ))
//         }
//       </div>
//       <MessageInput/>
//     </div>
//   )
 
// }

// export default ChatContainer

// v2

// import React, { useEffect } from 'react';
// import { useChatStore } from '../store/useChatStore.js';
// import ChatHeader from './ChatHeader.jsx';
// import MessageInput from './MessageInput.jsx';
// import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
// import { useAuthStore } from '../store/useAuthStore.js';
// import { formatMessageTime } from '../lib/utils.js';

// const ChatContainer = () => {
//   const { messages, getMessages, isMessagesLoading, selectedUser } = useChatStore();
//   const { authUser } = useAuthStore();

//   useEffect(() => {
//     getMessages(selectedUser._id);
//   }, [selectedUser._id, getMessages]);

//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`flex items-start ${
//               message.senderId === authUser._id ? 'justify-end' : 'justify-start'
//             }`}
//           >
//             <div className="chat-image avatar">
//               <div className="w-10 h-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || '/avatar.png'
//                       : selectedUser.profilePic || '/avatar.png'
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-content ml-3 flex flex-col">
//               <div className="chat-bubble flex flex-col max-w-[60%] bg-primary text-white rounded-xl p-2">
//                 {message.image && (
//                   <img
//                     src={message.image}
//                     alt="Attachment"
//                     className="sm:max-w-[200px] rounded-md mb-2"
//                   />
//                 )}
//                 {message.text && <p>{message.text}</p>}
//               </div>
//               <div className="chat-header mt-1">
//                 <time className="text-xs opacity-50">{formatMessageTime(message.createdAt)}</time>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <MessageInput />
//     </div>
//   );
// };

// export default ChatContainer;

// v3
import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx'; 
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { formatMessageTime } from '../lib/utils.js';
import { useRef } from 'react';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef=useRef(null);

  // useEffect(() => {
  //   getMessages(selectedUser._id);
  // }, [selectedUser._id, getMessages]);

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);

      subscribeToMessages();

      return()=>unsubscribeFromMessages();
    }
  }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages]);
  
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-start ${
              message.senderId === authUser._id ? 'justify-end' : 'justify-start'
            }`}
            ref={messageEndRef}
          >
            <div className={`chat-image avatar ${message.senderId === authUser._id ? 'order-last' : ''}`}>
              <div className="w-10 h-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || '/avatar.png'
                      : selectedUser.profilePic || '/avatar.png'
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className={`chat-content ml-3 flex flex-col ${message.senderId === authUser._id ? 'items-end' : 'items-start'}`}>
              <div className="chat-bubble flex flex-col max-w-[60%] bg-primary text-white rounded-xl p-2">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>

              {/* Time Section */}
              <div className="chat-header mt-1">
                <time className="text-xs opacity-50">{formatMessageTime(message.createdAt)}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
