import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { MessageCircleMore ,User,Mail, Eye,Lock, EyeOff, Loader2} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword,setShowPassword]=useState(false);
  const[formData,setFormData]=useState(
    {
      fullName:"",
      email:"",
      password:"",
    }
  );

  const {signup,isSignup}=useAuthStore();

  const validateForm=()=>{
    if(!formData.fullName.trim()) return toast.error("Fullname is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password.length<6) return toast.error("Password must be atleast of length 6");
    return true;
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const success=validateForm();
    if(success==true){
      signup(formData);
    }
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          <div className='text-center mb-8'>
            <div className='flex flex-col item-center gap-2 group'>
              {/* <div  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors">
                <MessageCircleMore className="size-6 text-primary"/>
              </div> */}
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
          <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="R Harsh"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                </div>
              </div>

              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="harsh@something.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                </div>
              </div>

              <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword?"text":"password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                type="button"
                className='absolute inset-y-0 right-0 pr-3 flex items-center'
                onClick={()=>setShowPassword(!showPassword)}
                >
                  {showPassword?(
                    <EyeOff className='size-5 text-base-content/40'/>
                  ):(
                    <Eye className='size-5 text-base-content/40'/>
                  )}
                </button>
                </div>
                </div>
                <button type='submit' className='btn btn-info w-full' disabled={isSignup}>
                  {isSignup?(
                    <>
                    <Loader2 className='size-5 animate-spin'/>
                    </>
                  ):(
                    "Create Account"
                  )}
                </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
            Already have account?{" "}
            <Link to="/login" className="link link-primary">
            Sign in
            </Link>
            </p>
          </div>
        </div>
      </div>
      {/* For right part */}
      {/* <div className="hidden min-h-screen lg:flex bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white justify-center items-center rounded-l-3xl">
  <div className="p-10 max-w-lg text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold">
      Welcome to Our Community!
    </h2>
    <p className="text-base md:text-lg">
      Join thousands of users who are already enjoying our platform. Sign up and explore the endless possibilities!
    </p>
    <Link to="/login">
      <button className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-500 transition-all duration-300">
        Get Started
      </button>
    </Link>
  </div>
</div> */}
{/* version 2 for right */}
<div className="hidden min-h-screen lg:flex bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white justify-center items-center rounded-l-3xl">
  <div className="p-10 max-w-lg text-center space-y-6">
    <h2 className="text-3xl md:text-4xl font-bold">
      Welcome to Our Community!
    </h2>
    <p className="text-base md:text-lg">
      Join thousands of users who are already enjoying our platform. Sign up and explore the endless possibilities!
    </p>
    <div className="mt-10">
      <Link to="/login">
        <button className="relative px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-500 group transition-all duration-300">
          <span className="flex items-center justify-center gap-2">
            Get Started
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              ➔
            </span>
          </span>
        </button>
      </Link>
    </div>
  </div>
</div>

    </div>
  );
}

export default SignUpPage
