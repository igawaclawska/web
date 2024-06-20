import { PrivateRoute } from "../../PrivateRoute";
import { Switch } from "react-router-dom";

import Settings from "../Settings";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "./ChangePassword";
import Languages from "./Languages";
import Interests from "./Interests";
import NonInterests from "./NonInterests";

export default function SettingsRouter({ api, setUser }) {
  return (
    <Switch>
      <PrivateRoute
        path="/account_settings"
        api={api}
        setUser={setUser}
        component={Settings}
      />

      <PrivateRoute
        path="/account_settings/profile_details"
        api={api}
        setUser={setUser}
        component={ProfileDetails}
      />

      <PrivateRoute
        path="/account_settings/change_password"
        api={api}
        setUser={setUser}
        component={ChangePassword}
      />

      <PrivateRoute
        path="/account_settings/languages"
        api={api}
        setUser={setUser}
        component={Languages}
      />

      <PrivateRoute
        path="/account_settings/interests"
        api={api}
        setUser={setUser}
        component={Interests}
      />

      <PrivateRoute
        path="/account_settings/non_interests"
        api={api}
        setUser={setUser}
        component={NonInterests}
      />
    </Switch>
  );
}
