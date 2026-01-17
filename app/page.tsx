import { redirect } from "next/navigation";
import routes from "./_utils/routes";

export default function Home() {
  redirect(routes.login);
}
