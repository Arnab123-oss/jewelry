import { MdError } from "react-icons/md"


const NotFound = () => {
  return (
    <div className="container not-found">
     <MdError/>
      <h1>Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
    </div>
  )
}

export default NotFound
