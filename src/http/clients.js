import Dkpeak from "./connector";
export const DkpeakConnector = new Dkpeak(
  process.env.VUE_APP_BASE_URL || "http://164.92.154.153:4001/"
);
