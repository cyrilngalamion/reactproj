import  Globe  from "../../assets/globe.gif";

export default function About(){
    return(
        <>
        <div className=" text-vistBlue">
            <img src={Globe} alt="Globe" className="mx-auto my-2 w-60 mt-7"/>
            <h1 className="font-mono font-bold text-lg pt-2 text-center">Web App</h1>
                <div className="grid grid-cols-2 mt-1 text-center">
                    <div className="m-5 p-10 text-left">
                        <h5 className="font-bold mb-2">Web App</h5>
                        <p>A ReactJS web application that fetches country data from a provided API endpoint, maps the data, and dynamically displays detailed information about a selected country. The application will leverage React components, hooks, and state management.</p>
                    </div>
                </div>
        </div>
        </>
    )
}