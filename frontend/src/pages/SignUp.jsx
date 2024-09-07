import {
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  InputAdornment,
} from "@mui/material";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const SignUp = () => {
  return (
    <div className="w-full min-h-screen bg-grey-scale-white flex flex-col">
      <Navbar />
      <header className="w-full min-h-[200px] bg-[url('/public/title@3x.png')] bg-cover bg-no-repeat text-center text-gray-700 font-manrope flex flex-col items-center justify-center py-8 mt-0">
        <div className="text-gray-700 uppercase font-semibold text-[10px]">
          farmsure / AUTH
        </div>
        <div className="text-grey-scale-white text-14xl-3 font-extrabold">
          SIGN UP
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="bg-floralwhite rounded-3xl w-full max-w-md p-8 shadow-lg py-0">
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
