import PropTypes from "prop-types";
import SearchBar from "./SearchBar";

const MarketHeader = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start pt-[2.5rem] px-[9.187rem] pb-[2.5rem] box-border gap-[1.712rem] bg-[url('/public/market_bg.png')] bg-cover bg-no-repeat bg-[top] max-w-full mt-[-0.019rem] text-left text-[2.144rem] text-[#fff] font-[Manrope] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border mq750:pl-[4.563rem] mq750:pr-[4.563rem] mq750:box-border ${className}`}
    >
      <div className="w-[22.725rem] flex flex-col items-start justify-start gap-[0.643rem] max-w-full">
        <b className="self-stretch relative tracking-[0.03em] leading-[120%] mq450:text-[1.313rem] mq450:leading-[1.563rem] mq1050:text-[1.688rem] mq1050:leading-[2.063rem]">
          Marketplace
        </b>
        <div className="self-stretch relative text-[0.75rem] tracking-[0.03em] leading-[100%] uppercase font-medium">
          Seal contracts, Sell produce
        </div>
      </div>
      <div className="w-[21.063rem] flex flex-row items-end justify-start max-w-full">
        <SearchBar />
      </div>
    </div>
  );
};

MarketHeader.propTypes = {
  className: PropTypes.string,
};

export default MarketHeader;
