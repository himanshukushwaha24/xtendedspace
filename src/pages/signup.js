
// import Register from "./login/register"
// const SignUp = ()=>{
    
//     return(
//         <>
//         <Register />
//         </>
//     )
// }

// export default SignUp
import React from "react";
import { useRouter } from "next/router";
import Register from "./login/register";

const SignUp = () => {
  const router = useRouter();
  const { phone } = router.query;

  return (
    <div>
      <Register phoneNumber={phone} />
    </div>
  );
};

export default SignUp;
