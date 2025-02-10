import ProfileForm from "./profile-form";
import { useSession, getSession } from "next-auth/react";
import classes from "./user-profile.module.css";
import { useEffect, useState } from "react";

function UserProfile() {
  //for next-auth v4 we may use useSession:
  // const { data: session, status } = useSession();

  // if (status === "loading") {
  //   return <p className={classes.profile}>Loading...</p>;
  // }

  // if (status === "unauthenticated") {
  //   window.location.href = "/auth";
  // }

  //for next-auth v3 we should use getSession:
  // const [ isLoading, setIsLoading ] = useState(true);

  // useEffect(() => {
  //   getSession().then(session => {
  //     setIsLoading(false);
  //     if (!session) {
  //       window.location.href = '/auth';
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });
  // }, []);

  // if(isLoading) {
  //   return <p className={classes.profile}>Loading...</p>
  // }

  async function changePasswordHandler(passwordData) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler}/>
    </section>
  );
}

export default UserProfile;
