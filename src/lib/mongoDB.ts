// import mongoose from "mongoose";

// type EnvironmentVariables = {
//   MONGO_URI: string;
//   // Add other environment variables here if needed
// };

// async function connectDB(): Promise<void> {
//   if (mongoose.connections[0].readyState) return;
//   mongoose.set("strictQuery", false);

//   const { MONGO_URI } = process.env as unknown as EnvironmentVariables;

//   if (!MONGO_URI) {
//     throw new Error("MONGO_URI environment variable is not defined.");
//   }

//   await mongoose.connect(MONGO_URI);
//   console.log("Connected to DB");
// }

// export default connectDB;



import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

const uri = process.env.MONGO_URI;

const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

if (!process.env.MONGO_URI) {
  throw new Error("No mongo URI provided");
}

client = new MongoClient(uri!, options);
clientPromise = client.connect()

clientPromise.then(()=> console.log("connected to mogodb atlas") )

export default clientPromise
