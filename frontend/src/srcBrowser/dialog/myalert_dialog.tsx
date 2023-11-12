import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react"
import { AppContext } from "../appContext";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type MyDlgOption = {
    title: string,
    body: JSX.Element,
    closeCallback: (isOk: boolean) => void
}



export const MyAlertDialog = () => {
    const { bahasa } = AppContext.current;
    const [openOption, setOpenOption] = useState<MyDlgOption | null>(null);

    myAlertDialog_openner = (opt) => {
        setOpenOption(opt);
    }

    const closeHandle = (ok: boolean) => {
        openOption?.closeCallback(ok);
        setOpenOption(null);

    }

    useEffect(() => {

        return () => {
            openOption?.closeCallback(false);
            console.log("ini sudah tutup");
        }

    }, [])

    return (
        <Dialog
            sx={{zIndex : 1302}}
            open={openOption != null}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => {
                closeHandle(false);
            }}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{openOption ? openOption.title : ""}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box width="300px">
                        {openOption ? openOption.body : <></>}
                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    closeHandle(true);

                }}>{bahasa.md_tutup}</Button>
            </DialogActions>
        </Dialog>
    )


}


let myAlertDialog_openner: ((opt: MyDlgOption) => void) | null = null

export const myAlertDialogShow = (opt: {
    title: string,
    body: JSX.Element,
}): Promise<boolean> => {

    return new Promise((r, x) => {

        myAlertDialog_openner?.({
            title: opt.title,
            body: opt.body,
            closeCallback: (ok) => {
                r(ok);
            }
        })

    })
}


/// CONTOH PENGGUNAAN

// onClick={async ()=>{
//     let ok = await myAlertDialogShow({
//         title : "ini contoh ya",
//         body : <>Ya ini contoh</>
//     })

//     console.log("dan hasilnya adalah " + ok)

// }}