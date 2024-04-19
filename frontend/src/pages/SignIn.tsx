import { Auth } from "../components/Auth"
import { Qoute } from "../components/Quote"

function Signin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
          <div>
              <Auth type="signin"/>
          </div>
          <div className="hidden lg:block">
          <Qoute/>
          </div>  
    </div>
  )
}

export default Signin