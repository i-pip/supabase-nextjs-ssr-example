import { useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Profile({ user }) {
  useEffect(() => {
    const logUser = () => {
      console.log(user);
    };
    logUser();
  }, []);

  return (
    <div class="container" style={{ padding: "50px 0 100px 0" }}>
      <div class="form-widget">
        <h2>Profile</h2>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    console.log("no user in req ");
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  return { props: { user } };
}
