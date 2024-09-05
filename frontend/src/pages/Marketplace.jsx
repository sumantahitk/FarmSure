import NavBar from "../components/NavBar";
import MarketHeader from "../components/MarketHeader";
import Footer from "../components/Footer";
// import Product from "../components/Product";
import CropList from "../components/Product";

const Marketplace = () => {
  return (
    <div className="w-full relative bg-[#fff] flex flex-col items-end justify-start gap-[0rem] leading-[normal] tracking-[normal] text-left text-[#4d4d4d] font-[Poppins]">
      <NavBar />
      <section className="self-stretch flex flex-col items-start justify-start max-w-full">
        <MarketHeader />
      </section>
      <section className="self-stretch flex flex-col items-start justify-start max-w-full">
        <CropList />
      </section>
      <Footer className="m-0 p-0" />
    </div>
  );
};


export default Marketplace;
