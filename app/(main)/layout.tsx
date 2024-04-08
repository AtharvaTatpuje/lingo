import { Sidebar } from "@/components/sidebar";
import { MobileHeader } from "@/components/mobile-header";
import { ExitModal } from "@/components/modals/exit-modal";

type props ={
    children : React.ReactNode;
};

const Mainlayout =({
    children,
}: props) => {
    return(
        <>
        <MobileHeader />
        <Sidebar className="hidden lg:flex"/>
        <main className="lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
            <div className="max-w-[1056px] mx-auto pt-6 h-full" >
              
               {children} 

            </div>
            
        </main>
        
        </>
        
    );
};

export default Mainlayout;