// import React from 'react'
// import { useAuthStore } from '../store/useAuthStore'
// import { MessageCircleMore, User,LogOut } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const navbar = () => {
//   const {logout,authUser}=useAuthStore();
//   return (
//     <header className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80'>
//       <div className='container mx-auto px-4 h-16'>
//         <div className='flex items-center justify-between h-full'>
//         <div className="flex items-center gap-8">
//             <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
//               <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageCircleMore className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-lg font-bold">HiPal!</h1>
//             </Link>
//           </div>
//           <div className='flexx items-center gap-2'>
//             {authUser && (
//               <>
//               <Link to={'/profile'} className='btn btn-m gap-2'>
//               <User className='size-5'>
//               </User>
//               <span className='hidden sm:inline'>Profile</span>
//               </Link>

//               <button className='flex gap-2 items-center' onClick={logout}>
//                 <LogOut className='size-5'></LogOut>
//                 <span className='hidden sm:inline'>Logout</span>
//               </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default navbar


// 2nd 
// import React from 'react';
// import { useAuthStore } from '../store/useAuthStore';
// import { MessageCircleMore, User, LogOut, LogIn } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const { logout, authUser } = useAuthStore();

//   return (
//     <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-sm">
//       <div className="container mx-auto px-6 h-16">
//         <div className="flex items-center justify-between h-full">
//           {/* Logo and Brand */}
//           <div className="flex items-center gap-4">
//             <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
//               <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
//                 <MessageCircleMore className="w-5 h-5 text-primary" />
//               </div>
//               <h1 className="text-xl font-bold text-primary">HiPal!</h1>
//             </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             {!authUser && (
//               <>
//                 <Link
//                   to="/login"
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
//                 >
//                   <LogIn className="w-5 h-5" />
//                   <span className="hidden sm:inline">Login</span>
//                 </Link>
//               </>
//             )}
//           </div>
//           <div className="flex items-center gap-4">
//             {authUser && (
//               <>
//                 <Link
//                   to="/profile"
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
//                 >
//                   <User className="w-5 h-5" />
//                   <span className="hidden sm:inline">Profile</span>
//                 </Link>
//                 <button
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
//                   onClick={logout}
//                 >
//                   <LogOut className="w-5 h-5" />
//                   <span className="hidden sm:inline">Logout</span>
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

// 3rd 
import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageCircleMore, User, LogOut, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80 shadow-sm">
      <div className="container mx-auto px-6 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircleMore className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-xl font-bold text-primary">HiPal!</h1>
            </Link>
          </div>

          {/* Profile and Logout */}
          {authUser && (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">{authUser.fullName}</span>
              <Link
                to="/profile"
                className={authUser && authUser.profilePic?"":"flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"}
                
              >
                {authUser.profilePic? (
                  <img
                    src={authUser.profilePic}
                    alt={authUser.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ):<><User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span></>}
                
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                onClick={logout}
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}

          {/* Login*/}
          {!authUser && (
            <div className="ml-auto">
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                <LogIn className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

