import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";

const BlogCard = ({
  className = "",
  propPadding,
  image2,
  farmersAlwaysHaveAnUpperHand,
  weEnsureThatContractorsDont,
  extraContent,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const blogCardStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const handleReadMoreClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={`bg-white rounded-md shadow-md flex flex-col items-start justify-between p-4 text-left text-sm text-[#002603] font-[Poppins] ${className}`}
      style={blogCardStyle}
    >
      <div className="flex flex-col items-start w-full h-[200px] max-w-full">
        <img
          className="w-full h-full rounded-md object-cover"
          loading="lazy"
          alt=""
          src={image2}
        />
      </div>
      <div className="flex flex-col items-start gap-2 mt-4">
        <div className="text-base font-medium text-[#002603]">
          {farmersAlwaysHaveAnUpperHand}
        </div>
        <div className="text-xs text-[#618062]">
          {weEnsureThatContractorsDont}
        </div>
        <div
          className="flex items-center text-xs text-[#00b307] font-semibold mt-2 cursor-pointer"
          onClick={handleReadMoreClick}
        >
          <div className="min-w-[3.5rem]">Read More</div>
          <img className="w-4 h-4 ml-2" alt="arrow" src="/arrow.svg" />
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-lg font-semibold text-[#002603] mb-2">
          {farmersAlwaysHaveAnUpperHand}
        </h3>
        <p className="text-sm text-[#618062] mb-4">
          {weEnsureThatContractorsDont}
        </p>
        <img
          className="w-full h-48 rounded-md object-cover mb-4"
          loading="lazy"
          alt=""
          src={image2}
        />
        <p className="text-sm text-[#002603]">{extraContent}</p>
        {/* Adding two more lines of text */}
        <p className="text-sm text-[#002603] mt-4">
          Additional insights for better understanding of our offerings. We
          strive to provide transparency and security in every transaction.
        </p>
      </Modal>
    </div>
  );
};

BlogCard.propTypes = {
  className: PropTypes.string,
  image2: PropTypes.string,
  farmersAlwaysHaveAnUpperHand: PropTypes.string,
  weEnsureThatContractorsDont: PropTypes.string,
  propPadding: PropTypes.string,
  extraContent: PropTypes.string,
};

export default BlogCard;
