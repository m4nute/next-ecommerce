import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function BasicPagination({ handleChange, total, page }: any) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack spacing={2}>
        <div className="flex justify-center mb-6">
          <Pagination
            count={total}
            page={parseInt(page)}
            size="large"
            onChange={(e, value) => {
              parseInt(page) !== value && handleChange("page", value);
            }}
          />
        </div>
      </Stack>
    </ThemeProvider>
  );
}
