import Dkpeak from "@/http/api/connector/DkpeakConnector";

export const DkpeakConnector = new Dkpeak(process.env.BASE_URL);
