import Link from "next/link";
import React, { useState } from "react";
import headerStyles from "../landing/header/header.module.css";
import createStyles from "./create.module.css";
import SignInButton from "../signinbutton/SignInButton";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLensUserContext } from "../../context/LensUserContext";
import SettingsSidebar from "./SettingsSidebar";
import ButtonBase from "@mui/material/ButtonBase";

type Props = {
  postMetadata: Record<string, any>;
  setPostMetadata: React.Dispatch<React.SetStateAction<Record<string, any>>>;
};

export default function CreateHeader({ postMetadata, setPostMetadata }: Props) {
  const { isSignedIn, data: lensProfile } = useLensUserContext();
  const [openSettingsSidebar, setOpenSettingsSidebar] =
    useState<boolean>(false);

  return (
    <>
      <div className={headerStyles.header}>
        <div className={headerStyles.left}>
          <Link href="/feed">
            {/*  eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="logo" height={56} />
          </Link>
        </div>

        {/* Before accesing post settings, need sign in and lens profile */}
        {!isSignedIn || !lensProfile ? (
          <SignInButton />
        ) : (
          <>
            <ButtonBase
              className={createStyles.settingsButton}
              onClick={() => setOpenSettingsSidebar(!openSettingsSidebar)}
            >
              <SettingsIcon />
            </ButtonBase>
          </>
        )}
      </div>

      <SettingsSidebar
        postMetadata={postMetadata}
        setPostMetadata={setPostMetadata}
        open={openSettingsSidebar}
        setOpen={setOpenSettingsSidebar}
      />
    </>
  );
}
