import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer =() =>{
    return( 
    <footer className="hidden lg:block h-20 w-full
    border-t-2 border-slate-200 p-2">
        <div className="max-w-screen-lg mx-auto flex items-cemter
        justify-evenly h-full">
            <Button size="lg" variant="ghost" className="w-full">
               <Image src="/sharemarket.svg" alt="sharemarket" height={32} width={40}
               className="mr-4 rounded-md"/> 
             Share Market
            </Button>
            <Button size="lg" variant="ghost" className="w-full">
               <Image src="/mutualfunds.svg" alt="mutualfunds" height={32} width={40}
               className="mr-4 rounded-md"/> 
             Mutual Funds
            </Button>            
            <Button size="lg" variant="ghost" className="w-full">
               <Image src="/bonds.svg" alt="bonds" height={32} width={40}
               className="mr-4 rounded-md"/> 
             Bonds
            </Button>
            <Button size="lg" variant="ghost" className="w-full">
               <Image src="/lifeinsurance.svg" alt="healthinsurance" height={32} width={40}
               className="mr-4 rounded-md"/> 
             Life Insurance
            </Button>
            <Button size="lg" variant="ghost" className="w-full">
               <Image src="/healthinsurance.svg" alt="stockprediction" height={32} width={40}
               className="mr-4 rounded-md"/> 
             Health Insurance
            </Button>
            

        </div>
        

        </footer>
        )
       
    
}