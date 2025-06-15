import { useNavigate } from "react-router-dom";
interface BorderProps{
    borders: string[];
}

export default function Borders({borders}: BorderProps){

    const navigate = useNavigate();

    return(
        <>
            <div>
                <h2>Borders: </h2>
                {borders.length > 0 ? (
                    <ul>
                        {borders.map((border)=>(
                            <li onClick={() => navigate(`/country/${border}`)}  className="bg-grNav p-2 m-1 inline-flex font-bold font-mono cursor-pointer text-amber-100  rounded-sm shadow-md">{border}</li>
                        ))}
                    </ul>
                ) : (<p className="text-red-400">No borders for this country.</p>)}
            </div>
        </>
    )
} 