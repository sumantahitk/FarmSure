import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

const FAQs = ({ className = "" }) => {
  return (
    <div
      id="faqs"
      className={`w-full flex flex-row items-center justify-center py-8 px-4 box-border text-left text-lg text-[#eec044] font-['Covered_By_Your_Grace'] ${className}`}
      style={{
        backgroundImage: "url('/sketch_house.png')",
        backgroundPosition: "center bottom",
        backgroundSize: "cover", // You can use 'contain' or 'cover' depending on your needs
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-row items-center justify-center gap-12 max-w-7xl w-full px-4">
        {/* FAQs Section */}
        <div className="w-full max-w-md flex flex-col gap-3 mb-10">
          <div className="text-left mb-6">
            <h2 className="text-13xl font-normal mb-0">
              Frequently Asked Questions
            </h2>
            <div className="text-14xl-3 font-semibold font-[Poppins] text-[#002603]">
              Let’s Talk About FarmSure and You!
            </div>
          </div>
          <Accordion
            className="!m-0"
            sx={{
              borderRadius: "10px",
              border: "1px solid #66bb6a",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography className="tracking-wide">
                1. What is FarmSure?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FarmSure is a platform that connects farmers directly with
                potential buyers, aiming to ensure stable income for farmers
                through blockchain-based smart contracts.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="!m-0"
            sx={{
              borderRadius: "10px",
              border: "1px solid #66bb6a",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography>
                2. How does FarmSure ensure stable income for farmers?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FarmSure uses smart contracts to establish secure, transparent,
                and enforceable agreements between farmers and buyers, reducing
                financial risks and ensuring consistent and timely payments for
                their produce.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="!m-0"
            sx={{
              borderRadius: "10px",
              border: "1px solid #66bb6a",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography>3. How does FarmSure benefit buyers?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Buyers gain direct access to fresh produce from farmers,
                ensuring quality, fair pricing, and secure transactions through
                our blockchain-based system.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="!m-0"
            sx={{
              borderRadius: "10px",
              border: "1px solid #66bb6a",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography>4. Can I negotiate prices on FarmSure?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes, FarmSure allows buyers and farmers to negotiate prices
                directly within the platform. This feature provides flexibility
                in reaching mutually agreeable terms before finalizing the smart
                contract, ensuring both parties are satisfied with the
                transaction.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            className="!m-0"
            sx={{
              borderRadius: "10px",
              border: "1px solid #66bb6a",
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<Icon>expand_more</Icon>}>
              <Typography>5. Is my personal data safe on FarmSure?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                We use advanced encryption and blockchain technology to ensure
                your personal and transactional data remains safe and secure at
                all times.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* Image Section */}
        <div className="flex-shrink-0 ml-3">
          <img
            className="h-auto w-full max-w-lg object-cover"
            alt="Farmer"
            src="/farmer4.png"
          />
        </div>
      </div>
    </div>
  );
};

FAQs.propTypes = {
  className: PropTypes.string,
};

export default FAQs;
