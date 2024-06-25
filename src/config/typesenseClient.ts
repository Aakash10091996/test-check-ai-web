import { type Client } from "typesense";
import Typesense from "typesense";
import {
  CONNECTION_TIMEOUT_IN_SEC,
  TYPESENSE_API_KEY,
  TYPESENSE_HOST,
  TYPESENSE_PORT,
} from "@/config/constants";

const typesenseClient: Client = new Typesense.Client({
  nodes: [
    {
      host: TYPESENSE_HOST,
      port: TYPESENSE_PORT,
      protocol: "https",
    },
  ],
  apiKey: TYPESENSE_API_KEY,
  connectionTimeoutSeconds: CONNECTION_TIMEOUT_IN_SEC,
});

export default typesenseClient;
