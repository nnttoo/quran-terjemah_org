import { Add, Delete, DriveFolderUpload, Face, ResetTv, Save } from "@mui/icons-material"
import { Box, Button, Fab, IconButton, ListItem, MenuItem, Select, TextField, Typography } from "@mui/material"
import { QoryData, QorySelector } from "../../audioplayer/qorySelector"
import { useState } from "react"
import { AppContext } from "../../appContext"
import { apptools_OpenFolder } from "../../tools/apptools"
import { convertToUri } from "../../tools/string_convert"



const QoryEditor = (p: {
   qorydata: QoryData,
   onRemove: (q: QoryData) => void
}) => {
   const [name, setName] = useState(p.qorydata.nama);
   const [url, setUrl] = useState(p.qorydata.url);
   const [fileExt, setFileExt] = useState(p.qorydata.ftype);


   let qoriData = p.qorydata;
   let { bahasa } = AppContext.current;


   return (
      <Box
         sx={{
            boxShadow: 2,
            marginTop: 3,
            padding: 2,
         }}

      >
         <Box>
            <Typography variant="caption" gutterBottom>
               {bahasa.pq_name} :
            </Typography>
            <TextField
               sx={{ marginBottom: 1 }}
               fullWidth
               size="small"
               value={name}
               onChange={(v) => {
                  let nName = v.target.value

                  qoriData.nama = nName;
                  setName(nName);

               }}
            />

            <Typography variant="caption" gutterBottom>
               {bahasa.pq_file_ext}
            </Typography>
            <Select
               fullWidth
               size="small"
               value={fileExt ? fileExt : "mp3"}

               onChange={(v) => {
                  let nFileExt = v.target.value;
                  qoriData.ftype = nFileExt;
                  setFileExt(nFileExt)

               }}
            >
               <MenuItem value="mp3">mp3</MenuItem>
               <MenuItem value="ogg">ogg</MenuItem>
            </Select>
            <Typography variant="caption" gutterBottom>
               {bahasa.pq_url}
            </Typography>
            <TextField
               fullWidth
               size="small"
               value={url}

               onChange={(v) => {
                  let nUrl = v.target.value;
                  qoriData.url = nUrl;
                  setUrl(nUrl);

               }}
            />
            <Box mt={2}
               display="flex"
               flexDirection="row"
               gap={2}
               justifyContent="space-around"
            >
               <Fab
                  size="small"
                  color="warning"
                  variant="circular"

                  onClick={() => {
                     p.onRemove(qoriData);
                  }}
               > <Delete />
               </Fab>

               <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={async () => {
                     let folderPath = await apptools_OpenFolder();
                     if (folderPath) {
                        qoriData.url = folderPath;

                        setUrl(folderPath);
                     }
                  }}

                  startIcon={<DriveFolderUpload />}
               >
                  {bahasa.pq_folder}
               </Button>
            </Box>
         </Box>
      </Box>
   )

}

export const PengaturanQori = () => {

   let qoriSelector = QorySelector.current;
   let [daftarQori, setDaftarQori] = useState(
      qoriSelector.getDaftarQory()
   );

   let ctx = AppContext.current;

   let bahasa  = ctx.bahasa;

   return (
      <Box sx={{
         height: "100%",
         display: "flex",
         flexDirection: "column",
      }}>

         <Box flex={1} p={1} sx={{ overflowY: "auto" }}>
            {
               daftarQori.map((q, i) => (
                  <QoryEditor
                     key={JSON.stringify(q)}
                     onRemove={(dq) => {
                        let nDaftarQori: QoryData[] = []

                        daftarQori.forEach((q, i) => {
                           if (q != dq) {
                              nDaftarQori.push(q);
                           }
                        })



                        qoriSelector.saveDaftarQory(nDaftarQori, false);
                        setDaftarQori(qoriSelector.getDaftarQory());


                     }}

                     qorydata={q}
                  ></QoryEditor>
               ))
            }
            <Box textAlign="center" p={3}>
               <Fab
                  onClick={() => {
                     console.log("ininiiiiii")
                     let ndaftarQory: QoryData[] = [];
                     if (daftarQori != null) {
                        ndaftarQory = [...daftarQori];
                     }
                     if (ndaftarQory == null) {
                        ndaftarQory = [];
                     }

                     ndaftarQory.push({
                        ftype: "mp3",
                        nama: "",
                        url: "",
                     });

                     qoriSelector.saveDaftarQory(ndaftarQory, false);
                     setDaftarQori(qoriSelector.getDaftarQory());

                  }}
                  variant="circular" >
                  <Add />
               </Fab>
            </Box>

         </Box>

         <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            paddingTop: 2,
            justifyContent: "space-around",
         }}>
            <Button
               variant="contained"
               color="warning"
               size="small"
               startIcon={<ResetTv />}

               onClick={() => {
                  qoriSelector.resetToDeaultQori();
                  let nDaftar = qoriSelector.getDaftarQory();

                  setDaftarQori(nDaftar);

               }}
            >
               {bahasa.pq_reset_qory}
            </Button>
            <Button
               startIcon={<Save />}
               variant="contained"
               size="small"
               onClick={() => {
                  qoriSelector.saveDaftarQory(daftarQori, true);
                  ctx.reloadPage();
               }}
            >
               {bahasa.pq_simpan_setting}

            </Button>
         </Box>
      </Box>
   )
}