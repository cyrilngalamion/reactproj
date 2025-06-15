export default function Footer(){
    return(
        <footer className="p-1 bg-transparent  text-center text-sm text-gray-600 ">
      <p>
        &copy; {new Date().getFullYear()} Web App. All rights reserved.
      </p>
    </footer>
    )
}