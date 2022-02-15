import { Express } from "express";

const app = Express();
app.listen(5000, () => {
  console.log("Listening at 5000");
});
app.use(Express.json());
