// import '@/app/globals.css';

// const BackgroundBlobs = ()=>{
//     return(
//         <div className="background-effect">
//         <svg>
//             <defs>
//             <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <circle cx="8" cy="8" r="2" fill="#67e8f9" opacity="0.10" />
//             </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#dots)" />
//         </svg>
//         <div className="blob blob-1"></div>
//         <div className="blob blob-2"></div>
//         </div>

//     )
// }
// export default BackgroundBlobs;
import '@/app/globals.css';

const BackgroundBlobs = () => {
  return (
    <div className="background-effect">
      <svg>
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="8" cy="8" r="2" fill="#67e8f9" opacity="0.10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="#67e8f9" strokeWidth="2" opacity="0.08"/>
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="#f472b6" strokeWidth="2" opacity="0.08"/>
      </svg>
    </div>
  );
};

export default BackgroundBlobs;