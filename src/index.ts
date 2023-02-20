import app from "./server"

const port:number = 8080;

app.listen(port, () => console.log(`Server started on PORT ${port}`));

