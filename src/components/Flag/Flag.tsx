import { useNavigate } from "react-router-dom"

interface FlagProps{
    cntry: {
        name: string;
        flag: string;
      };
}

export default function Flag({cntry}: FlagProps){
    const navigate = useNavigate();

    return(
        <>
            <div
                  key={cntry.name}
                  onClick={() => navigate(`/country/${cntry.name}`)}
                  className="bg-grNav rounded-md overflow-hidden cursor-pointer transition text-vistBlue shadow-md hover:scale-x-[1.02] hover:scale-y-[1.02]"
                
                >
                  <div>
                  <img src={cntry.flag} alt={cntry.name} className="w-full h-full"/>
                  </div>
                  <div className="font-semibold text-sm px-4 py-5 font-mono text-center">
                  <p className="text-xl font-bold">{cntry.name}</p>
                  </div>
                </div>
        </>
    )
}