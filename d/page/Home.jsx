import NavBar from "../components/NavBar";
import HomeFront from "../components/HomeFront";
import Footer from "../components/Footer";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Video from "../components/Video";
import FAQs from "../components/FAQs";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-grey-scale-white flex flex-col">
      <section className="self-stretch relative w-full max-w-full py-0 px-0">
        <NavBar />
      </section>
      <section className="self-stretch relative w-full max-w-full py-0 px-0 mq450:py-6 mq450:px-2">
        <HomeFront />
      </section>
      <section className="self-stretch relative w-full max-w-full py-0 px-0 mq450:py-6 mq450:px-2">
        <Features />
      </section>
      <section className="self-stretch relative w-full max-w-full py-0 px-0 mq450:py-6 mq450:px-2">
        <Testimonials />
      </section>
      <section className="self-stretch relative w-full max-w-full py-0 px-0 mq450:py-6 mq450:px-2">
        <Video />
      </section>
      <section className="self-stretch relative w-full max-w-full py-0 px-0 mq450:py-6 mq450:px-2">
        <FAQs />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
