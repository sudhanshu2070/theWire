import appFinal from "./app";
const port = process.env.PORT || 5000;

// Start the server
appFinal.listen(port, () => {
  console.log(`Server running on port ${port}`);
});