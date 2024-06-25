import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import * as scs from "./Settings.sc";
import strings from "../i18n/definitions";
import SettingsItem from "./settings_page_shared/SettingsItem";
import ListOfSettingItems from "./settings_page_shared/ListOfSettingItems";

export default function Settings() {
  const user = useContext(UserContext);

  return (
    <scs.StyledWrapper>
      <scs.PageHeading>{strings.settings}</scs.PageHeading>
      <ListOfSettingItems header={"My Account"}>
        <SettingsItem path={"/account_settings/profile_details"}>
          Profile Details
        </SettingsItem>
        <SettingsItem path={"/account_settings/languages"}>
          {" "}
          Languages
        </SettingsItem>

        {!user.is_teacher && (
          <SettingsItem path={"/account_settings/current_class"}>
            {" "}
            My Current Class
          </SettingsItem>
        )}
      </ListOfSettingItems>

      <ListOfSettingItems header={"Exercise Preferences"}>
        <SettingsItem path={"/account_settings/audio_exercises"}>
          {" "}
          Audio Exercises
        </SettingsItem>
      </ListOfSettingItems>

      <ListOfSettingItems header={"Reading Preferences"}>
        <SettingsItem path={"/account_settings/interests"}>
          {" "}
          Interests
        </SettingsItem>
        <SettingsItem path={"/account_settings/non_interests"}>
          {" "}
          Non-Interests
        </SettingsItem>
      </ListOfSettingItems>

      <ListOfSettingItems header={"Account Management"}>
        <SettingsItem path={"/account_settings/delete_account"}>
          Delete Account
        </SettingsItem>
      </ListOfSettingItems>
    </scs.StyledWrapper>
  );
}
