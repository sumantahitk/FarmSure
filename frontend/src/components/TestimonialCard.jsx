import { useMemo } from "react";
import PropTypes from "prop-types";

const TestimonialCard = ({
  className = "",
  propWidth,
  image,
  sMajumder,
  propMinWidth,
  star6,
  star7,
  star10,
}) => {
  const reviewerStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const sMajumderStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <div
      className={`flex-1 shadow-[0px_8.5px_17px_rgba(0,_0,_0,_0.01)] rounded-[15px] bg-[#fff] flex flex-col items-start justify-start py-[1.275rem] px-[1.25rem] box-border gap-[0.85rem] min-w-[15.25rem] max-w-full text-left text-[0.744rem] text-[#4d4d4d] font-[Poppins] ${className}`}
    >
      <img
        className="w-[1.7rem] h-[1.381rem] relative"
        loading="lazy"
        alt=""
        src="/vector.svg"
      />
      <div className="self-stretch relative leading-[150%]">
        This is a revolution. An agriculture revolution, bigger than the green
        revolution, bigger than anything India has ever seen. I wish the team
        all the best and LFG!!! 🔥🔥🔥
      </div>
      <div className="self-stretch flex flex-row items-center justify-between pt-[0.425rem] px-[0rem] pb-[0rem] gap-[1.25rem] text-center text-[0.85rem] text-[#1a1a1a] mq450:flex-wrap">
        <div
          className="flex flex-row items-center justify-start py-[0rem] px-[0rem] gap-[0.637rem]"
          style={reviewerStyle}
        >
          <img
            className="h-[2.975rem] w-[2.975rem] relative rounded-[50%] object-cover"
            loading="lazy"
            alt=""
            src={image}
          />
          <div className="flex flex-col items-start justify-start">
            <div
              className="relative leading-[150%] font-medium inline-block min-w-[5.375rem]"
              style={sMajumderStyle}
            >
              {sMajumder}
            </div>
            <div className="relative text-[0.744rem] leading-[1.125rem] text-[#999] inline-block min-w-[3.75rem]">
              Customer
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start gap-[0.056rem]">
          <img
            className="h-[1.063rem] w-[1.063rem] relative overflow-hidden shrink-0 min-h-[1.063rem]"
            loading="lazy"
            alt=""
            src={star6}
          />
          <img
            className="h-[1.063rem] w-[1.063rem] relative overflow-hidden shrink-0 min-h-[1.063rem]"
            loading="lazy"
            alt=""
            src={star7}
          />
          <img
            className="h-[1.063rem] w-[1.063rem] relative overflow-hidden shrink-0 min-h-[1.063rem]"
            loading="lazy"
            alt=""
            src="/star-8.svg"
          />
          <img
            className="h-[1.063rem] w-[1.063rem] relative overflow-hidden shrink-0 min-h-[1.063rem]"
            loading="lazy"
            alt=""
            src="/star-9.svg"
          />
          <img
            className="h-[1.063rem] w-[1.063rem] relative overflow-hidden shrink-0 min-h-[1.063rem]"
            alt=""
            src={star10}
          />
        </div>
      </div>
    </div>
  );
};

TestimonialCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  sMajumder: PropTypes.string,
  star6: PropTypes.string,
  star7: PropTypes.string,
  star10: PropTypes.string,

  /** Style props */
  propWidth: PropTypes.any,
  propMinWidth: PropTypes.any,
};

export default TestimonialCard;
