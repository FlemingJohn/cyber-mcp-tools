import { createHttpHandler } from "../dist/createHttpHandler.js";

const handler = createHttpHandler();

export { handler as GET, handler as POST, handler as DELETE };
