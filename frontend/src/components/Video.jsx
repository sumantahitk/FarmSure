import PropTypes from "prop-types";

const Video = ({ className = "" }) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center py-12 pt-0 px-4 box-border max-w-full text-center text-sm text-[#bd5555] font-[Mandali] ${className}`}
    >
      <div className="flex flex-col items-center gap-4 text-[#eec044] font-['Covered_By_Your_Grace']">
        <h2 className="text-14xl-3 font-normal mb-0">VIDEO</h2>
        <div className="text-14xl-3 font-semibold font-[Poppins] text-[#002603] mb-9">
          Okay, but how <br /> does it work?
        </div>
      </div>
      {/* Background video */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl">
        <video
          className="w-full h-auto object-cover"
          controls
          loop
          muted
          playsInline
          style={{ display: "block" }}
        >
          <source src="/demo_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

Video.propTypes = {
  className: PropTypes.string,
};

export default Video;
