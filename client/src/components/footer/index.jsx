import essilogo from "../../assets/images/essi-logo.png";
import becillogo from "../../assets/images/becil.png";
import vmslogo from "../../assets/images/vms-logo.png";

const Footer = () => {
  return (
    <div
      className="px-4 fixed bottom-0 w-full bg-gray-100 flex justify-between"
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <footer className="w-full flex justify-center items-center h-16 bg-gray-100">
        <div className="footer-text font-bold flex items-center">
          Developed with <span className="text-red-500 mx-2">❤︎</span>
        </div>
      </footer>

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
