import logo from "../assets/logo/image.png";

export default function ShaLogo(){
  return(
  <>
    <div className="flex items-center select-none ">

      {/* Logo Image */}
      <img
        src={logo}
        alt="MediDost Logo"
        className="
          h-6 sm:h-6 md:h-8 lg:h-10
          w-auto object-contain
        "
      />

      {/* Brand Name */}
      <h1
        className="
          text-lg sm:text-xl md:text-2xl lg:text-3xl
          font-bold
          tracking-normal
          leading-none
          ml-2
        "
      >
        <span className="text-white">
          Medi
        </span>
        <span className="text-gray-300">
          Dost
        </span>
      </h1>

    </div>
  
  </>
  );
}