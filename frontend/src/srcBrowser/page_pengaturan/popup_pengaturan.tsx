import { Box, Modal } from "@mui/material"
import { useState } from "react"
import { PengaturanPage } from "./pengaturan_page";   
import { LoadingPage } from "./loadingpage";
import { PopupPengaturanController } from "./popup_pentaturan_controller";

export const PopupPengaturan = () => {
    const [modalopen, setmodalOpen] = useState(false); 
    const [menuname, setMenuName] = useState(""); 

    let mycontroller = PopupPengaturanController.current;
    mycontroller.setModal = (mo, menunameIn) => {
        if(menunameIn){
            setMenuName(menunameIn);
        }
        
        setmodalOpen(mo);
    }


    return (
        <Modal
            open={modalopen}
            onClose={async () => {  
                setmodalOpen(false);
            }}
            disableAutoFocus
        >

            <Box

                borderRadius={2}
                sx={{
                    width: 400,
                    height: 600,
                    bgcolor: 'background.paper',
                    position: "absolute",
                    bottom: 15,
                    left: 20,
                    overflow: "auto",
                    boxShadow: 24,
                }}>
                {
                    <PengaturanPage menuname={menuname} />
                }


            </Box>

        </Modal>
    )
}