import appFinal from "./app";
const port = process.env.PORT || 5000;

// Start the server
appFinal.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});