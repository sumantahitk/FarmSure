
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import UpdateForm from "../components/UpdateForm";

const UpdateContract = () => {
  return (
    <div className="w-full min-h-screen bg-grey-scale-white flex flex-col">
      <Navbar/>
      <header className="w-full bg-[url('/public/title@3x.png')] bg-cover bg-no-repeat text-center text-gray-700 font-manrope py-8 mt-20">
        <div className="w-full max-w-screen-xl mx-auto text ">
          <h2 className="text-grey-scale-white text-3xl-5  font-extrabold">
            Update Contract
          </h2>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-10">
        <div className="bg-floralwhite rounded-3xl w-full max-w-md p-8 shadow-lg">
          <UpdateForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UpdateContract;
