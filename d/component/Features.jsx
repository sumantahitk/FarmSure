import BlogCard from "./BlogCard";
import PropTypes from "prop-types";

const Features = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full bg-[#f8f7f0] flex flex-col items-center justify-start pt-0 pb-24 px-0 gap-6 text-center text-lg text-[#eec044] font-['Covered_By_Your_Grace'] ${className}`}
    >
      {/* Background image container */}
      <div
        className="absolute inset-x-0 bottom-0 w-full h-60 bg-cover bg-center bg-no-repeat z-[1]"
        style={{ backgroundImage: `url('/feature_bg.png')` }}
      ></div>

      <div className="flex flex-col items-center gap-6 max-w-full px-0 mt-1 z-[2]">
        {" "}
        {/* Added mt-20 to provide space above */}
        <div className="flex flex-col items-center">
          <h2 className="text-14xl-3 font-normal mb-0">Features</h2>
          <div className="text-14xl-3 font-semibold font-[Poppins] text-[#002603]">
            What do we offer?
          </div>
        </div>
        {/* Centered cards with adjusted margins */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-lg mx-auto">
          {/* BlogCard 1 */}
          <BlogCard
            className="mx-auto"
            image2="/feature1.png"
            farmersAlwaysHaveAnUpperHand="Farmers always have an upper hand on deciding selling prices."
            weEnsureThatContractorsDont="We ensure that contractors don’t indulge in predatory pricing by giving farmers/sellers the freedom to choose at what price to sell their stock."
            extraContent="In addition to setting prices, farmers can also choose the timing and volume of their sales, ensuring they get the best deal for their produce."
          />

          {/* BlogCard 2 */}
          <BlogCard
            className="mx-auto"
            image2="/feature2.png"
            farmersAlwaysHaveAnUpperHand="Buy fresh produce right from the farms without any middlemen."
            weEnsureThatContractorsDont="We have done away with middlemen. On FarmSure, contractors initiate contracts, and farmers negotiate and fulfill them themselves."
            extraContent="This direct interaction ensures that the quality and pricing are transparent, benefiting both farmers and consumers."
          />

          {/* BlogCard 3 */}
          <BlogCard
            className="mx-auto"
            image2="/feature3.png"
            farmersAlwaysHaveAnUpperHand="AI-based price recommendations, and highly secured contracts."
            weEnsureThatContractorsDont="All contracts on FarmSure are highly secured through the use of BlockChain. We ensure that no one is able to hack into the farmers’ earnings."
            extraContent="The AI system also provides predictive analytics, helping farmers anticipate market trends and adjust their strategies accordingly."
          />
        </div>
      </div>
    </div>
  );
};

Features.propTypes = {
  className: PropTypes.string,
};

export default Features;
