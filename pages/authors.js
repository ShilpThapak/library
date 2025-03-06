import ClientOnly from "@/components/ClientOnly";
import AllAuthors from "@/components/AllAuthors";
import { Stack, Typography } from "@mui/material";
import BasicModal from "@/components/BasicModal";
import CreateAuthorForm from "@/components/CreateAuthorForm";

export default function Authors() {
  return (
    <>
      <Stack
            direction="row"
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Typography variant="h3" >
              Authors
            </Typography>
            <BasicModal btnName="Add Author" innerContent={<CreateAuthorForm />}/>
        </Stack>

        <br></br>
      <ClientOnly>
          <AllAuthors />
      </ClientOnly>
    </>
  );
}
