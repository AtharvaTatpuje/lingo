import { Button } from "@/components/ui/button";

const ButtonsPage = () =>{
    return(
        <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button> Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="primaryOutline">Primary Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondaryOutline">Secondary Outline</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="dangerOutline">DangerOutline</Button>
            <Button variant="super">Super</Button>
            <Button variant="superOutline">superOutline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="sidebar">Sidebar</Button>
            <Button variant="sidebarOutline">SidebarOutline</Button>

            
        </div>
    );
}

export default ButtonsPage;