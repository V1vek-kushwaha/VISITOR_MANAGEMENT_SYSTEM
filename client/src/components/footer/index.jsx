import essilogo from "../../assets/images/essi-logo.png";
import becillogo from "../../assets/images/becil.png";
import vmslogo from "../../assets/images/vms-logo.png";

const Footer = () => {
  return (
    <div
      className="px-4 fixed bottom-0 w-full bg-gray-100 flex justify-between"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <div className="footer-text flex items-center font-bold">
        Developed with <span className="text-red-500 mt-1 mx-2">❤︎</span>
      </div>
      <div
        className="footer-text flex items-center"
        style={{ width: "60px", marginRight: "20%" }}
      >
        <img className="w-full" src={vmslogo} alt="" />
      </div>
    </div>
  );
};

export default Footer;
