import { bottombarLinks } from "@/constants"
import { Link, useLocation } from "react-router-dom"

function Bottombar() {

  const {pathname} = useLocation()
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link)=>{
        const isActive = pathname === link.route
        return(
          <Link to={link.route}
          key={link.label}
          className={`flex gap-1 flex-center flex-col p-2 transition ${isActive && 'bg-primary-500 rounded-[10px]'}`}>
            <img 
              src={link.imgURL} 
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && 'invert-white'}`}
            />
            <p className="tiny-medium text-light-2">
              {link.label}
            </p>
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar